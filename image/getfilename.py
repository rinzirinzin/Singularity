import os
filename = os.listdir("./")
ans = []
for i in range(len(filename)):
    ans.append(filename[i][:-4])
print(ans)