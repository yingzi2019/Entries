import logging

from pymysql import install_as_MySQLdb


install_as_MySQLdb()

logger = logging.getLogger('django')
