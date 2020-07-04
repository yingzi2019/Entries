
from django import http
from django.contrib.auth.backends import ModelBackend, UserModel


# 用户认证
from django.contrib.auth.mixins import LoginRequiredMixin


class CustomizeUserAuthBackend(ModelBackend):
    """
    自定义用户认证
    """
    # def authenticate(self, request, username=None, password=None, **kwargs):
    #     """
    #     重写认证方法
    #     :param request: 请求对象
    #     :param username: 用户名
    #     :param password: 密码
    #     :param kwargs:
    #     :return: User or Exception
    #     """
    #     return request.user
    pass


# 用户登录认证
class LoginRequiredJSONMixin(LoginRequiredMixin):
    def handle_no_permission(self):
        return http.JsonResponse({"code": '4600', "msg": "用户未登陆"})



jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER  # 生payload部分的方法
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER    # 生成jwt的方法

#  {'exp': xxx, 'email': '', 'user_id': 1, 'username': 'admin'}
# user：登录的用户对象
payload = jwt_payload_handler(user)   # 生成payload, 得到字典
token = jwt_encode_handler(payload)   # 生成jwt字符串