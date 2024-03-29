const BaseModel = require('../../base_module/index');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

class Runway {
    constructor() {
        this.runWayURL = '';
        this.storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'upload/image/');
            },
            filename: function (req, file, cb) {
                const name = new Date().getTime();
                const files = file.originalname.split('.');
                const suffix = files[files.length - 1];

                cb(null, `${name}-${files[0]}.${suffix}`);
            }
        });
        this.getImage = this.getImage.bind(this);
    }

    async runWayText(req, res) {
        const text = req.query.text;

        res.send(text);
    }

    // 获取前端的文件
    async getImage(req, res) {
        const upload = multer({ storage: this.storage });
        upload.single('file')(req, res, err => {
            if (err instanceof multer.MulterError) {
                return res.send({
                    status: 400,
                    error: err.message,
                })
            } else if (err) {
                return res.send({
                    status: 500,
                    error: err.message,
                })
            } else {
                return res.send({
                    status: 200,
                    url: '/image/' + req.file.filename,
                    name: req.file.filename,
                })
            }
        })
    }


    // 删除图片
    async deleteImage(req, res, next) {
        const { name } = req.query;
        const imagePath = path.join(__dirname, '../../upload/image/', name);
        fs.unlink(imagePath, err => {
            if (err) {
                res.status(404).send({
                    message: '删除图片出错',
                })
            } else {
                res.send({
                    status: 200,
                    message: '删除成功',
                })
            }
        })
    }
}

module.exports = new Runway();