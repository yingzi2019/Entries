# coding:utf-8


class RESP_CODE(object):
    OK                  = "0"
    IMAGECODEERR        = "4001"
    THROTTLINGERR       = "4002"
    NECESSARYPARAMERR   = "4003"
    USERERR             = "4004"
    PWDERR              = "4005"
    CPWDERR             = "4006"
    MOBILEERR           = "4007"
    SMSCODERR           = "4008"
    ALLOWERR            = "4009"
    SESSIONERR          = "4101"
    DBERR               = "5000"
    EMAILERR            = "5001"
    TELERR              = "5002"
    NODATAERR           = "5003"
    NEWPWDERR           = "5004"
    OPENIDERR           = "5005"
    PARAMERR            = "5006"
    STOCKERR            = "5007"


err_msg = {
    RESP_CODE.OK                 : u"成功",
    RESP_CODE.IMAGECODEERR       : u"图形验证码错误",
    RESP_CODE.THROTTLINGERR      : u"访问过于频繁",
    RESP_CODE.NECESSARYPARAMERR  : u"缺少必传参数",
    RESP_CODE.USERERR            : u"用户名错误",
    RESP_CODE.PWDERR             : u"密码错误",
    RESP_CODE.CPWDERR            : u"密码不一致",
    RESP_CODE.MOBILEERR          : u"手机号错误",
    RESP_CODE.SMSCODERR          : u"短信验证码有误",
    RESP_CODE.ALLOWERR           : u"未勾选协议",
    RESP_CODE.SESSIONERR         : u"用户未登录",
    RESP_CODE.DBERR              : u"数据错误",
    RESP_CODE.EMAILERR           : u"邮箱错误",
    RESP_CODE.TELERR             : u"固定电话错误",
    RESP_CODE.NODATAERR          : u"无数据",
    RESP_CODE.NEWPWDERR          : u"新密码数据",
    RESP_CODE.OPENIDERR          : u"无效的openid",
    RESP_CODE.PARAMERR           : u"参数错误",
    RESP_CODE.STOCKERR           : u"库存不足",
}
