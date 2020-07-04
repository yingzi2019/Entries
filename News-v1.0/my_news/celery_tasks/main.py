from celery import Celery

import os
if not os.getenv('DJANGO_SETTINGS_MODULE'):
    os.environ['DJANGO_SETTINGS_MODULE'] = 'my_news.settings'

# 创建实例
celery_app = Celery('newsApp')

# 加载配置
celery_app.config_from_object('celery_tasks.celery_config')

# 注册任务
celery_app.autodiscover_tasks(['celery_tasks.send_email'])

# celery -A celery_tasks.main worker -l info
