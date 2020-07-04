from itsdangerous import TimedJSONWebSignatureSerializer as Serializer, BadData
from django.conf import settings

# 创建序列化
def generate_eccess_token(data={'user': 'AnyOne'}):
        serializer = Serializer(settings.SECRET_KEY, expires_in=3600)
        data = {"openid": data}
        token = serializer.dumps(data)
        return token.decode()

# 创建反序列化
def check_access_token(access_token):
    # 创建序列化器对象：序列化和反序列化的对象的参数必须是一模一样的
    s = Serializer(settings.SECRET_KEY, 3600)

    # 反序列化openid密文
    try:
        data = s.loads(access_token)
    except BadData:  # openid密文过期
        return None
    else:
        # 返回openid明文
        return data.get('user')