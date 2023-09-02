import random
from captcha.image import ImageCaptcha
#https://github.com/lepture/captcha/tree/master

#モジュールの編集箇所
# from captcha.image import ImageCaptcha
# image.py 
# def _draw_character
# 文字の描画位置を拡大
# w = int((right - left)*1.7) or 1 -> w = int((right - left)*3.0) or 1
# h = int((bottom - top)*1.7) or 1 -> h = int((bottom - top)*3.0) or 1
#
# def generate_image
# 190行目付近に以下を追加
# for _ in range(random.randint(2, 4)):
#    self.create_noise_dots(im, color) #dots
# for _ in range(random.randint(4, 8)):
#    self.create_noise_curve(im, color) #line

#make list
lower_case  = [chr(ord('a')+i) for i in range(26)]
upper_case  = [chr(ord('A')+i) for i in range(26)]
number_case = [str(i) for i in range(10)]
numchar_list = lower_case + upper_case + number_case

def make_image(cap_str):
    image = ImageCaptcha(width=450,height=300,fonts = None,font_sizes = (30,40,50))
    data = image.generate(cap_str)
    image.write(cap_str, './image/' + cap_str + '.png')
    return

def random_maker(N):
    cap_str = []
    for i in range(N):
        cap_str.append(numchar_list[random.randint(0,len(numchar_list)-1)])
    make_image("".join(cap_str))
    return

def make_str(num_cap):
    minstr = 5
    maxstr = 12
    for i in range(num_cap):
        random_maker(random.randint(minstr,maxstr))

if __name__ == '__main__':
    make_str(10)
