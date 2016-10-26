import os
import re
import json

gex = re.compile('(">)(.+?)(<\/div>)')

def replace(file,cdir):
    #print(cdir+file)
    if os.path.isfile(cdir+file) and file.endswith('.html'):
        f = open(cdir+file,'r')
        data = f.read()
        f.close()
        data = ''.join(data.split('\n'))
        found = re.findall(gex,data)
        actdata = []
        for x in found:
            actdata.append(x[1])
        act = {}
        try:
            act['title']=actdata[0]
            act['header']=actdata[1]
            act['text']=actdata[2]
            x = file.split('.')[0]+'.json'
            f=open(cdir+x,'w')
            f.write(json.dumps(act))
            f.close()
        except Exception:
            pass
    elif os.path.isdir(cdir+file):
        under = os.listdir(cdir+file)
        #print(under)
        for f in under:
            replace(f,cdir+file+"\\")

replace(os.getcwd(),'')
        
