import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Regexp } from '../../utils/Regexp'
import { Hoverable } from '../Hoverable/index'
import { CityData } from '../../utils/CityData'
import { IndustryTypeData } from '../../utils/IndustryTypeData'
import { UploadPic } from '../../components/Upload/index';
import { Row, Col, Badge, Button, Card, Input, Cascader } from 'antd';
import Utils from '../../utils/Utils';

import './CompanyDetail.less';

/**
 * 展示公司信息组件
 */
export default class CompanyDetail extends React.Component {
    static propTypes = {
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);
        this.state = {
            companySearch: {}, // 公司信息
            bankSearch: {}, // 银行信息
            papersSearch: {}, // 证件信息
            invoiceSearch: {}, // 开票信息
            toggerShowArr: [false, false, false, false], // 步骤显示控制,分别对应 公司信息、企业银行账户、证件信息、开票信息
        };
    }

    componentDidMount() {

    }

    handleCompanyChange = (e) => {
        e.target.value = e.target.value.replace(/^\s+|\s+$/gm, '');
        let val = e.target.value;
        let name = e.target.name;
        let companySearch = this.state.companySearch;
        companySearch[name] = val;
        this.setState({
            companySearch: companySearch
        });

        this.companyCheck(name);
    }
    handleBankChange = (e) => {
        e.target.value = e.target.value.replace(/^\s+|\s+$/gm, '');
        let val = e.target.value;
        let name = e.target.name;
        let bankSearch = this.state.bankSearch;
        bankSearch[name] = val;
        this.setState({
            bankSearch: bankSearch
        });

        this.bankCheck(name);
    }
    handlePapersCompanyChange = (e) => {
        e.target.value = e.target.value.replace(/^\s+|\s+$/gm, '');
        let val = e.target.value;
        let name = e.target.name;
        let papersSearch = this.state.papersSearch;
        papersSearch[name] = val;
        this.setState({
            papersSearch: papersSearch
        });

        this.papersCheck(name);
    }
    handleInvoiceCompanyChange = (e) => {
        e.target.value = e.target.value.replace(/^\s+|\s+$/gm, '');
        let val = e.target.value;
        let name = e.target.name;
        let invoiceSearch = this.state.invoiceSearch;
        invoiceSearch[name] = val;
        this.setState({
            invoiceSearch: invoiceSearch
        });

        this.invoiceCheck(name);
    }

    companyCheck = (name) => {
        let companySearch = this.state.companySearch;
        let handle = {
            "userName": () => {
                if (!companySearch.userName) {
                    companySearch.userNameErr = "请输入企业名称";
                    this.setState({ companySearch });
                    return false;
                }
                companySearch.userNameErr = "";
                this.setState({ companySearch });
                return true;
            },
        }

        return global.formCheck(name, handle);
    }
    bankCheck = (name) => {
        let bankSearch = this.state.bankSearch;
        let handle = {
            "phone": () => {
                if (!bankSearch.phone) {
                    bankSearch.phoneErr = "请输入手机号";
                    this.setState({ bankSearch });
                    return false;
                }
                if (!Regexp.phoneReg.test(bankSearch.phone)) {
                    bankSearch.phoneErr = "请输入正确的手机号";
                    this.setState({ bankSearch });
                    return false;
                }
                bankSearch.phoneErr = "";
                this.setState({ bankSearch });
                return true;
            },
        }

        return global.formCheck(name, handle);
    }
    papersCheck = (name) => {
        let papersSearch = this.state.papersSearch;
        let handle = {
            "phone": () => {
                if (!papersSearch.phone) {
                    papersSearch.phoneErr = "请输入手机号";
                    this.setState({ papersSearch });
                    return false;
                }
                if (!Regexp.phoneReg.test(papersSearch.phone)) {
                    papersSearch.phoneErr = "请输入正确的手机号";
                    this.setState({ papersSearch });
                    return false;
                }
                papersSearch.phoneErr = "";
                this.setState({ papersSearch });
                return true;
            },
        }

        return global.formCheck(name, handle);
    }
    invoiceCheck = (name) => {
        let invoiceSearch = this.state.invoiceSearch;
        let handle = {
            "phone": () => {
                if (!invoiceSearch.phone) {
                    invoiceSearch.phoneErr = "请输入手机号";
                    this.setState({ invoiceSearch });
                    return false;
                }
                if (!Regexp.phoneReg.test(invoiceSearch.phone)) {
                    invoiceSearch.phoneErr = "请输入正确的手机号";
                    this.setState({ invoiceSearch });
                    return false;
                }
                invoiceSearch.phoneErr = "";
                this.setState({ invoiceSearch });
                return true;
            },
        }

        return global.formCheck(name, handle);
    }

    // 编辑
    companyInfoEdit = (num) => {
        let toggerShowArr = this.state.toggerShowArr;
        toggerShowArr = Utils.setArrEleFalse(toggerShowArr);
        toggerShowArr[num] = true;
        this.setState({ toggerShowArr });
    }
    // 保存
    companyInfoSave = (num) => {
        switch (num) {
            case '0':
                if(!this.companyCheck()){
                    return false;
                }
                break;
            case '1':
                if(!this.bankCheck()){
                    return false;
                }
                break;
            case '2':
                if(!this.papersCheck()){
                    return false;
                }
                break;
            case '3':
                if(!this.invoiceCheck()){
                    return false;
                }
                break;
        
            default:
                break;
        }

        console.log(1111);

        let toggerShowArr = this.state.toggerShowArr;
        toggerShowArr = Utils.setArrEleFalse(toggerShowArr);
        this.setState({ toggerShowArr });
    }
    /**
     *  公司信息编辑
     * */
    // 省市区三级联动
    onCityChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    }
    // 行业类别三级联动
    onIndustryTypeChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    }

    /**
     *  证件信息
     * */
    // 图片上传回调
    uploadImg = (info) => {
        console.log(info);
        // if (info.file.status === 'done') {

        // }
    }


    render() {
        const { className, onCompanyAddEdit, ...others } = this.props;
        const { companySearch, bankSearch, papersSearch, invoiceSearch, toggerShowArr } = this.state;
        const cls = classNames({
            [className]: className
        });

        return (
            <div className={cls} {...others}>
                <div className="state_right"><Badge status="processing" text="审核中" /></div>
                <div className="cd_module_wrap">
                    <div className="cd_module_both">
                        <Hoverable>
                            <Card
                                type="inner"
                                title="公司信息"
                                style={{ width: 500 }}
                                extra={
                                    toggerShowArr[0]?
                                    <Button type="primary" icon="save" onClick={() => this.companyInfoSave('0')}>保存</Button>:<Button type="primary" icon="edit" onClick={() => this.companyInfoEdit('0')}>编辑</Button>
                                }
                            >
                                {
                                    toggerShowArr[0] &&
                                    <div>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>企业名称</Col>
                                            <Col span={12}>
                                                <Input className="width350" placeholder="公司名称必须与营业执照上一致" maxLength="30" name="userName" onChange={this.handleCompanyChange} />
                                                <div className="error_info">{companySearch.userNameErr}</div>
                                            </Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>统一社会信用代码</Col>
                                            <Col span={12}>
                                                <Input className="width350" placeholder="请输入统一社会信用代码" maxLength="30" name="userName" onChange={this.handleCompanyChange} />
                                                <div className="error_info">{companySearch.userNameErr}</div>
                                            </Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>行业类别</Col>
                                            <Col span={12}>
                                                <Cascader className="width350" placeholder="选择行业类别" options={IndustryTypeData} expandTrigger="hover" onChange={this.onIndustryTypeChange} />
                                                <div className="error_info">{companySearch.userNameErr}</div>
                                            </Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>客服电话</Col>
                                            <Col span={12}>
                                                <Input className="width350" placeholder="请输入客服电话" maxLength="30" name="userName" onChange={this.handleCompanyChange} />
                                                <div className="error_info">{companySearch.userNameErr}</div>
                                            </Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>办公地址</Col>
                                            <Col span={12}>
                                                <Cascader className="width350" placeholder="选择办公地址" options={CityData} expandTrigger="hover" onChange={this.onCityChange} />
                                                <div className="error_info">{companySearch.userNameErr}</div>
                                            </Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>详细地址</Col>
                                            <Col span={12}>
                                                <Input className="width350" placeholder="请输入详细地址" maxLength="30" name="userName" onChange={this.handleCompanyChange} />
                                                <div className="error_info">{companySearch.userNameErr}</div>
                                            </Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>企业邮箱</Col>
                                            <Col span={12}>
                                                <Input className="width350" placeholder="请输入公司邮箱" maxLength="30" name="userName" onChange={this.handleCompanyChange} />
                                                <div className="error_info">{companySearch.userNameErr}</div>
                                            </Col>
                                        </Row>
                                    </div>
                                }
                                {
                                    !toggerShowArr[0] &&
                                    <div>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>企业名称</Col>
                                            <Col span={12}>哈哈哈哈集团</Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>统一社会信用代码</Col>
                                            <Col span={12}>234999809000892</Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>行业类别</Col>
                                            <Col span={12}>支付行业</Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>客服电话</Col>
                                            <Col span={12}>支付行业</Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>办公地址</Col>
                                            <Col span={12}>支付行业</Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>详细地址</Col>
                                            <Col span={12}>支付行业</Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>企业邮箱</Col>
                                            <Col span={12}>支付行业</Col>
                                        </Row>
                                    </div>
                                }

                            </Card>
                        </Hoverable>
                        <Hoverable style={{ marginTop: '20px' }}>
                            <Card
                                type="inner"
                                title="企业银行账户"
                                style={{ width: 500 }}
                                extra={
                                    toggerShowArr[1]?
                                    <Button type="primary" icon="save" onClick={() => this.companyInfoSave('1')}>保存</Button>:<Button type="primary" icon="edit" onClick={() => this.companyInfoEdit('1')}>编辑</Button>
                                }
                            >
                                {
                                    toggerShowArr[1] &&
                                    <div>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>开户名称</Col>
                                            <Col span={12}>
                                                <Input className="width350" placeholder="请输入纳税的开户名称" maxLength="30" name="userName" onChange={this.handleChange} />
                                                <div className="error_info">{bankSearch.userNameErr}</div>
                                            </Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>开户账号</Col>
                                            <Col span={12}>
                                                <Input className="width350" placeholder="请输入纳税的开户账号" maxLength="30" name="userName" onChange={this.handleChange} />
                                                <div className="error_info">{bankSearch.userNameErr}</div>
                                            </Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>开户银行</Col>
                                            <Col span={12}>
                                                <Input className="width350" placeholder="请输入纳税的开户银行名称" maxLength="30" name="userName" onChange={this.handleChange} />
                                                <div className="error_info">{bankSearch.userNameErr}</div>
                                            </Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>银行卡照片</Col>
                                            <Col span={12}>
                                                <UploadPic
                                                    title="银行卡照片"
                                                    uploadKey="xixixi"
                                                    uploadURL="//jsonplaceholder.typicode.com/posts/"
                                                    picURL=""
                                                    onChange={this.uploadImg}
                                                ></UploadPic>
                                                <div className="error_info">{bankSearch.userNameErr}</div>
                                            </Col>
                                        </Row>
                                    </div>
                                }
                                {
                                    !toggerShowArr[1] &&
                                    <div>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>开户名称</Col>
                                            <Col span={12}>234999809000892</Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>开户账号</Col>
                                            <Col span={12}>234999809000892</Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>开户银行</Col>
                                            <Col span={12}>支付行业</Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>银行卡照片</Col>
                                            <Col span={12}><img className="pic_img" src={require('../../images/banner01.png')}></img></Col>
                                        </Row>
                                    </div>
                                }
                            </Card>
                        </Hoverable>
                    </div>
                    <div className="cd_module_both">
                        <Hoverable>
                            <Card
                                type="inner"
                                title="证件信息"
                                style={{ width: 500 }}
                                extra={
                                    toggerShowArr[2]?
                                    <Button type="primary" icon="save" onClick={() => this.companyInfoSave('2')}>保存</Button>:<Button type="primary" icon="edit" onClick={() => this.companyInfoEdit('2')}>编辑</Button>
                                }
                            >
                                {
                                    toggerShowArr[2] &&
                                    <div>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>法人姓名</Col>
                                            <Col span={12}>
                                                <Input className="width350" placeholder="请输入法人姓名" maxLength="30" name="userName" onChange={this.handleChange} />
                                                <div className="error_info">{papersSearch.userNameErr}</div>
                                            </Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>法人身份证号</Col>
                                            <Col span={12}>
                                                <Input className="width350" placeholder="请输入法人身份证号" maxLength="30" name="userName" onChange={this.handleChange} />
                                                <div className="error_info">{papersSearch.userNameErr}</div>
                                            </Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>法人身份证照</Col>
                                            <Col span={8}>
                                                <UploadPic
                                                    title="身份证正面"
                                                    uploadKey="xixixi"
                                                    uploadURL="//jsonplaceholder.typicode.com/posts/"
                                                    picURL=""
                                                    onChange={this.uploadImg}
                                                ></UploadPic>
                                                <div className="error_info">{papersSearch.userNameErr}</div>
                                            </Col>
                                            <Col span={8}>
                                                <UploadPic
                                                    title="身份证反面"
                                                    uploadKey="xixixi"
                                                    uploadURL="//jsonplaceholder.typicode.com/posts/"
                                                    picURL=""
                                                    onChange={this.uploadImg}
                                                ></UploadPic>
                                                <div className="error_info">{papersSearch.userNameErr}</div>
                                            </Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>营业执照</Col>
                                            <Col span={8}>
                                                <UploadPic
                                                    title="营业执照"
                                                    uploadKey="xixixi"
                                                    uploadURL="//jsonplaceholder.typicode.com/posts/"
                                                    picURL=""
                                                    onChange={this.uploadImg}
                                                ></UploadPic>
                                                <div className="error_info">{papersSearch.userNameErr}</div>
                                            </Col>
                                        </Row>
                                    </div>
                                }
                                {
                                    !toggerShowArr[2] &&
                                    <div>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>法人姓名</Col>
                                            <Col span={12}>234999809000892</Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>法人身份证号</Col>
                                            <Col span={12}>支付行业</Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>法人身份证照</Col>
                                            <Col span={8}><img className="pic_img" src={require('../../images/banner01.png')}></img></Col>
                                            <Col span={8}><img className="pic_img" src={require('../../images/banner01.png')}></img></Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>营业执照</Col>
                                            <Col span={8}><img className="pic_img" src={require('../../images/banner01.png')}></img></Col>
                                        </Row>
                                    </div>
                                }
                            </Card>
                        </Hoverable>
                        <Hoverable style={{ marginTop: '20px' }}>
                            <Card
                                type="inner"
                                title="开票信息"
                                style={{ width: 500 }}
                                extra={
                                    toggerShowArr[3]?
                                    <Button type="primary" icon="save" onClick={() => this.companyInfoSave('3')}>保存</Button>:<Button type="primary" icon="edit" onClick={() => this.companyInfoEdit('3')}>编辑</Button>
                                }
                            >
                                {
                                    toggerShowArr[3] &&
                                    <div>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>发票抬头</Col>
                                            <Col span={12}>
                                                <Input className="width350" placeholder="请输入营业执照上的法定名称" maxLength="30" name="userName" onChange={this.handleChange} />
                                                <div className="error_info">{invoiceSearch.userNameErr}</div>
                                            </Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>信用代码</Col>
                                            <Col span={12}>
                                                <Input className="width350" placeholder="请输入统一的社会信用代码" maxLength="30" name="userName" onChange={this.handleChange} />
                                                <div className="error_info">{invoiceSearch.userNameErr}</div>
                                            </Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>注册地址</Col>
                                            <Col span={12}>
                                                <Input className="width350" placeholder="请输入公司注册地址" maxLength="30" name="userName" onChange={this.handleChange} />
                                                <div className="error_info">{invoiceSearch.userNameErr}</div>
                                            </Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>公司电话</Col>
                                            <Col span={12}>
                                                <Input className="width350" placeholder="请输入公司电话，区号-总机" maxLength="30" name="userName" onChange={this.handleChange} />
                                                <div className="error_info">{invoiceSearch.userNameErr}</div>
                                            </Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>开户银行</Col>
                                            <Col span={12}>
                                                <Input className="width350" placeholder="请输入开户银行名称" maxLength="30" name="userName" onChange={this.handleChange} />
                                                <div className="error_info">{invoiceSearch.userNameErr}</div>
                                            </Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>开户账号</Col>
                                            <Col span={12}>
                                                <Input className="width350" placeholder="请输入开户银行账号" maxLength="30" name="userName" onChange={this.handleChange} />
                                                <div className="error_info">{invoiceSearch.userNameErr}</div>
                                            </Col>
                                        </Row>
                                    </div>
                                }
                                {
                                    !toggerShowArr[3] &&
                                    <div>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>发票抬头</Col>
                                            <Col span={12}>234999809000892</Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>信用代码</Col>
                                            <Col span={12}>234999809000892</Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>注册地址</Col>
                                            <Col span={12}>支付行业</Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>公司电话</Col>
                                            <Col span={12}>支付行业</Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>开户银行</Col>
                                            <Col span={12}>支付行业</Col>
                                        </Row>
                                        <Row type="flex" align="middle" className="mb25" gutter={16}>
                                            <Col span={4}>开户账号</Col>
                                            <Col span={12}>支付行业</Col>
                                        </Row>
                                    </div>
                                }
                            </Card>
                        </Hoverable>
                    </div>
                </div>
            </div>
        );
    }
}
