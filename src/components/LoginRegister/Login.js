import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Regexp } from '../../utils/Regexp'
import { Row, Col } from 'antd';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import './Login.styl';

export default class Login extends React.Component {
    static propTypes = {
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);
        this.state = {
            search:{}
        };
    }

    componentDidMount() {

    }

    handleChange = (e) => {
        e.target.value = e.target.value.replace(/^\s+|\s+$/gm, '');
        let val = e.target.value;
        let name = e.target.name;
        let search = this.state.search;
        search[name] = val;
        this.setState({
            search: search
        });

        this.check(name);
    }

    check = (name)=>{
        let search = this.state.search;
        let handle ={
            "phone":()=>{
                if (!search.phone) {
                    search.phoneErr = "请输入手机号";
                    this.setState({search});
                    return false;
                }
                if (!Regexp.phoneReg.test(search.phone)) {
                    search.phoneErr = "请输入正确的手机号";
                    this.setState({search});
                    return false;
                }
                search.phoneErr = "";
                this.setState({search});
                return true;
            },
            "password":()=>{
                if (!search.password) {
                    search.passwordErr = "请输入密码";
                    this.setState({search});
                    return false;
                }
                search.passwordErr = "";
                this.setState({search});
                return true;
            },
        }
        if(name){
            handle[name]();
        }else{
            let temp = [];
            Object.keys(handle).map((item)=>{
                temp.push(handle[item]());
            });
            return !temp.includes(false);
        }

    }

    // 立即注册
    saveFormData = ()=>{
        if(!this.check()){
            return;
        }

        console.log("立即注册");
    }

    gotoRegisterCkick = () => {
        this.props.onForgetPassword ? this.props.onForgetPassword : null;
    }

    forgetPasswordCkick = () => {
        this.props.onRegister ? this.props.onRegister : null;
    }

    render() {
        const { text, className, onRegister, onForgetPassword, ...others } = this.props;
        const { search } = this.state;


        return (
            <div className="login_module_wrap" {...others}>
                <div className="title">企业福利平台登录</div>
                <div className="icon"></div>
                <div className="login_panel_wrap">
                    <Row className="mb25">
                        <Input className="login_input" placeholder="输入手机号" name="phone" onChange={this.handleChange}/>
                        <div className="error_info">{search.phoneErr}</div>
                    </Row>
                    <Row className="mb25">
                        <Input type="password" className="login_input" placeholder="输入密码" name="password" onChange={this.handleChange}/>
                        <div className="error_info">{search.passwordErr}</div>
                    </Row>
                    <Row className="mb25">
                        <Button type="primary" className="login_form_button" onClick={this.saveFormData}>登录</Button>
                    </Row>
                    <Row className="mb25">
                        <a className="ahref" onClick={this.gotoRegisterCkick}>立即注册</a>
                        <a className="ahref" onClick={this.forgetPasswordCkick}>忘记密码?</a>
                    </Row>
                    <Row className="mb25">
                        <span className="error_info">{this.state.error_info}</span>
                    </Row>
                </div>
            </div>
        );
    }
}
