from django.http import JsonResponse

from tools.resp_code import RESP_CODE, err_msg


# 默认返回数据的结构
DEFAULT_CODE = RESP_CODE.OK
DEFAULT_DATA_TYPE = list()
DEFAULT_MSG = ''


def generate_orginal():
    result = dict()
    result['code'] = DEFAULT_CODE
    result['data'] = DEFAULT_DATA_TYPE
    result['msg'] = DEFAULT_MSG
    return result


def BasicJsonResponse(resp_code=None, data=None, msg='', **kwargs):
    # 生成原始数据
    result = generate_orginal()

    # 替换消息
    if msg:
        result['msg'] = msg
    if resp_code:
        result['msg'] = err_msg[resp_code]

    # 替换数据
    if data:
        result['data'] = data
    return JsonResponse(result, **kwargs)