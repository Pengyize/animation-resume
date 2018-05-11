function writeCode(prefix,code,fn) {
    let domCode = document.querySelector('#code');
    domCode.innerHTML = prefix || '';
    let n=0;
    let id = setInterval(() => {
        n += 1;
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
        styleTag.innerHTML = prefix + code.substring(0, n);
        domCode.scrollTop = domCode.scrollHeight;
        if(n >= code.length){
            window.clearInterval(id);
            fn && fn.call();
        }
    },30)
}

function writeMarkdown(markdown,fn) {
    let domPaper = document.querySelector('#paper > .content');
    let n=0;
    let id = setInterval(() => {
        n += 1;
        domPaper.innerHTML = markdown.substring(0, n);
        domPaper.scrollTop = domPaper.scrollHeight;
        if (n >= markdown.length) {
            window.clearInterval(id);
            fn && fn();
        }
    },30);

}


let result = `/*
 * 面试官你好，我是彭奕泽
 * 下面是我的会动的简历~
 */
 
/* 首先给所有元素加上过渡效果 */
*{
 transition: all 1s;
}
/* 白色背景太单调了，我们来点背景 */
html{
    background: #ddd;
}
/* 文字离边框太近了 */
#code-wrapper{
    padding: 20px;
}
/* 加个边框 */
#code{
    border: 1px solid #888;
    padding: 24px;
}

/* 我需要一点代码高亮 */
.token.selector{
    color: #690;
}
.token.property{
    color: #905;
}

/* 来点呼吸效果 */
#code{
    animation: breath 0.5s infinite alternate-reverse;
}
`;


let result2 = `

/* 接下来给自己准备一张白纸 */
#code-wrapper{
    position: fixed;
    width: 50%;
    left: 0;
    height: 100%;
    padding: 20px;
}
#code{
    border: 1px solid #888;
}
#paper{
    position: fixed;
    right: 0;
    width:50%;
    height:100%;
    background: #444;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
}
#paper > .content{
   background: white;
   width: 100%;
   height: 100%;
}
/* 好了，我开始写简历了 */
`;

let md = `
 # 自我介绍
   
   我叫彭奕泽
   目前在南京信息工程大学读大三
   自学前端半年
   希望应聘前端开发的职位

 # 技能介绍
   
   熟悉
   - JavaScript 
   - css 
   - HTML
   - Vue.js


 # 项目介绍
   
   1. [画板](http://pengyize.top/canvas)
   2. [键盘导航页](http://pengyize.top/nav)
   3. [用css画皮卡丘](http://pengyize.top/Pikachu)


 # 联系方式
   
   - 微信 soulze
   - QQ  649786395


 # 我的资料
   
   - [我的博客](https://pengyize.github.io/)
   - [GitHub](https://github.com/Pengyize)
 
`;

let result3 = `
/* 接下来用一个优秀的库 marked.js 把markdown变成HTML 
 */

`;

let result4 = `
/* 这就是我会动的简历，谢谢观看 */
`;


writeCode('',result,()=>{
    createPaper(()=>{
        writeCode(result, result2, ()=>{
            writeMarkdown(md,()=>{
                writeCode(result + result2,result3,()=> {
                    convertMarkdownToHtml(() => {
                        writeCode(result + result2 + result3, result4);
                    })
                })
            })
        })
    })
});

function createPaper(fn) {
    let paper = document.createElement('div');
    paper.id = 'paper';
    let content = document.createElement('pre');
    content.className = 'content';
    paper.appendChild(content);
    document.body.appendChild(paper);
    fn && fn();
}

function convertMarkdownToHtml(fn) {
    let div = document.createElement('div');
    div.className = 'html markdown-body';
    div.innerHTML = marked(md);
    let markdown = document.querySelector('#paper > .content');
    markdown.replaceWith(div);
    fn && fn();
}
