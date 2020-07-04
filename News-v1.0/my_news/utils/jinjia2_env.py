from jinja2 import Environment
from django.contrib.staticfiles.storage import staticfiles_storage
from django.urls import reverse
from my_news import logger

# 本质是引用函数，因此可以定制一些自定义的模板方法
def jinja2_environment(**options):
    env = Environment(**options)
    env.globals.update({
        # 获取静态文件前缀
        'static': staticfiles_storage.url,

        # 反向解析
        'url': reverse
    })

