BROKER_URL = 'redis://127.0.0.1:6379/10'  # 中间件 地址
CELERY_RESULT_BACKEND = 'redis://192.168.192.128:6379/12'  # 结果存放地址

# 任务导入
CELERY_IMPORTS = (
    'celery_app.task1',
    'celery_app.task2',
    )
