var express = require('express');
var cors = require('cors');
require('dotenv').config()


var app = express();

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file;
  res.json({name: file.originalname,type: file.mimetype,size: file.size})
  });



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

//Đoạn mã trên sử dụng thư viện multer để xử lý việc tải tệp lên trong ứng dụng Node.js. Đầu tiên, multer được khởi tạo với một đối tượng cấu hình có thuộc tính dest được đặt thành 'uploads/'. Điều này cho biết các tệp được tải lên sẽ được lưu trữ trong thư mục uploads.Sau đó, một route POST được định nghĩa cho đường dẫn /api/fileanalyse. Route này sử dụng phương thức upload.single('upfile') của đối tượng upload để xử lý việc tải lên một tệp duy nhất có tên trường là 'upfile'. Trong hàm xử lý route, thông tin về tệp được tải lên có thể được truy cập thông qua thuộc tính req.file. Cuối cùng, route trả về một đối tượng JSON chứa thông tin về tên gốc, loại MIME và kích thước của tệp được tải lên.
