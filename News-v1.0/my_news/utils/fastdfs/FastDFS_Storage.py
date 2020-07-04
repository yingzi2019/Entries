from django.conf import settings
from django.core.files.storage import Storage


class FastDFSStorage(Storage):

    def __init__(self, fdfs_base_url=None):
        self.fdfs_base_url = fdfs_base_url or settings.FDFS_BASE_URL


    def _open(self):
        pass

    def _save(self):
        pass

    def url(self, name):
        return self.fdfs_base_url + name

# 指定自定义的Django文件存储类   DEFAULT_FILE_STORAGE = 'my_news.utils.fastdfs.fdfs_storage.FastDFSStorage'
