import React, { Component } from 'react';
import { Upload, Button,Icon, message } from 'antd';


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    let errortip = document.getElementById("errortip");
    let errortipword = document.getElementById("errortipword");
    if (!isJPG) {
        errortip.style.display = "block";
        errortipword.innerHTML = '只支持jpg格式的文件！';
        setTimeout(function () {
            errortip.style.display = "none";
            errortipword.innerHTML = '';
        }, 1500);
        //message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        errortip.style.display = "block";
        errortipword.innerHTML = '图片大小要小于2MB！';
        setTimeout(function () {
            errortip.style.display = "none";
            errortipword.innerHTML = '';
        }, 1500);
        //message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}
export default class Avatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: true
        };
    }
    handleChange = (info) => {

        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => {
                this.setState({ imageUrl })
                console.log(encodeURIComponent(imageUrl))
                fetch(`http://learnapi.gogo-talk.com:8333/api/HomePage/Upload`,
                    {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                            , Authorization: window.localStorage.getItem('Tonken')
                        },
                        body: `base64img=${encodeURIComponent(imageUrl)}`
                    })
                    .then(res => res.json())
                    .then(json => {
                        console.log(encodeURIComponent(this.state.imageUrl));
                        console.log(json);
                        this.setState({
                            imageUrl: json.data,
                            flag: false
                        })
                        errortip.style.display = "block";
                        errortipword.innerHTML = '头像修改成功';
                        setTimeout(function () {
                            errortip.style.display = "none";
                            errortipword.innerHTML = '';
                        }, 1500);
                    })
            });

        }
    };
    // componentDidMount(){

    //     this.setState({
    //         imageUrl:this.props.imgUrl
    //     })
    // }
    render() {
        const imageUrl = this.state.flag ? this.props.imgUrl : this.state.imageUrl;
        // const imageUrl = this.state.imageUrl;
        return (
            <div className="userImg">
                <from className="userImgBox" enctype="multipart/form-data">
                    <Upload className="avatar-uploader" ref='upimg'
                        name="avatar"
                        showUploadList={false}
                        action="http://learnapi.gogo-talk.com:8333/api/HomePage/UpLoadImg"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange.bind(this)}>
                        {
                            imageUrl ?
                                <img src={imageUrl} alt="" className="avatar" /> :
                                <img src="../images/bg_nav_top.png" alt="" className="avatar" />
                        }
                        <Button className="xiugaiHead">
                        修改头像
                        </Button>
                    </Upload>
                </from>
                {/* <span className="xiugaiHead" onClick={this.handleChange.bind(this)}>修改头像</span> */}
                <div className="yy_mengtai" id="errortip">
                    <div className="yy_mengtai3" style={{ display: 'block' }}>
                        <div className="yy" style={{ textAlign: 'center', lineHeight: '60px' }}>
                            <h5 id="errortipword">预约成功</h5>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
