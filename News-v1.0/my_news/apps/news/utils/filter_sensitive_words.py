# -*- coding:utf-8 -*-

"""
# 过滤敏感词
# site: https://www.jianshu.com/p/c124b0d6ebb0
# site: https://my.oschina.net/mickelfeng/blog/845545
"""

import time

class DFAFilter(object):
    """
    DFA 过滤
    """

    def __init__(self):
        self.keyword_chains = {}  # 关键词链表
        self.delimit = '\x00'  # 限定，表示结束

    # 增加
    def add(self, keyword):
        keyword = keyword.lower()  # 如果有英文, 变为小写
        chars = keyword.strip()  # 去除首尾空格
        if not chars:  # 关键词为空，直接返回
            return

        map_keywords = self.keyword_chains
        # 遍历每个关键字
        for i in range(len(chars)):
            # 如果字符存在于字符链的key中,
            if chars[i] in map_keywords:
                # 进入其子字典
                map_keywords = map_keywords[chars[i]]

            # 不在字典中，为新的敏感词

            # 如果是已存在的敏感词，如果不是字典，退出循环
            if not isinstance(map_keywords, dict):

                break

            for j in range(i, len(chars)):
                if j == len(chars) - 1:
                    last_keywords[self.delimit] = 0
                    break
                map_keywords[chars[j]] = {}
                last_keywords, last_char = map_keywords, chars[j]
                map_keywords = last_keywords[chars[j]]


            # # 遍历剩下的字词
            # for j in range(i, len(chars)):
            #     # 先创建敏感词汇枝叶
            #     level[chars[j]] = {}
            #     # 暂时将新的枝叶作为最后的枝叶，将敏感字作为最后的叶子
            #     last_level, last_char = level, chars[j]
            #     #
            #     level = level[chars[j]]
            #     last_level[last_char] = {self.delimit: 0}
            if i == len(chars) - 1:
                map_keywords[self.delimit] = 0
                break


    # 解析
    def parse_file(self, path):
        """
        获取目标文件
        """
        with open(path, encoding='utf-8') as f:
            for keyword in f:
                self.add(str(keyword).strip())
            print(self.keyword_chains)

    # 执行过滤
    def filter(self, message, sub_str='*'):
        message = message.lower()
        result = []
        start = 0
        while start < len(message):
            level = self.keyword_chains
            step_incr = 0

            for char in  message[start:]:
                if char in level.keys():
                    step_incr += 1

                    if self.delimit not in level[char]:
                        level = level[char]
                    else:
                        result.append(sub_str * step_incr)
                        start += step_incr - 1
                        break
                else:
                    result.append(message[start])
                start += 1

        return ''.join(result)


if __name__ == '__main__':
    time1 = time.time()
    gfw = DFAFilter()
    path = "./sensitive_words.txt"
    gfw.parse_file(path)
    text = "你真是个大傻逼，大傻子，傻大个，大坏蛋，坏人。"
    result = gfw.filter(text,)

    print(text)
    print(result)
    time2 = time.time()
    print('总共耗时：' + str(time2 - time1) + 's')