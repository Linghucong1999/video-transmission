const path = require('path');
const fs = require('fs');

class Video {
    constructor() {
        this.sendStream = this.sendStream.bind(this);
    }

    async sendStream(req, res) {
        try {
            const videoPath = path.resolve(__dirname, '../../public/video');
            const files = fs.readdirSync(videoPath);
            const reandomIndex = Math.floor(Math.random() * files.length);
            const videoFile = files[reandomIndex];
            const filePath = path.join(videoPath, videoFile);
            const stat = fs.statSync(filePath);
            const fileSize = stat.size;
            const range = req.headers.range;
            if (range) {
                const parts = range.replace(/bytes=/, "").split("-");
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                const chunksize = (end - start) + 1;
                const file = fs.createReadStream(filePath, { start, end });
                const head = {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunksize,
                    'Content-Type': 'video/mp4',
                }
                res.writeHead(206, head);
                file.pipe(res);
            } else {
                const head = {
                    'Content-Length': fileSize,
                    'Content-Type': 'video/mp4',
                }
                res.writeHead(200, head);
                fs.createReadStream(filePath).pipe(res);

            }
        } catch (err) {
            console.log("读取视频出错" + err);
            res.status(500).send({
                message: "读取视频出错"
            })
        }
    }

    async getVideoHtml(req, res, next) {
        const videoPath = path.resolve(__dirname, '../../public/view/index.html');
        res.sendFile(videoPath, (err) => {
            if (err) {
                res.status(500).send({
                    message: '发送视频流出错',
                })
            }
        })
    }
}
module.exports = new Video();