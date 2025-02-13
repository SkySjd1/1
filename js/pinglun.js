// 获取页面中的评论表单和评论容器
const commentForm = document.getElementById('comment-form');
const commentsContainer = document.getElementById('comments-container');
// 生成用于存储评论的localStorage键名，键名基于文章标题
const articleKey = 'comments_' + document.title.replace(/ /g, '_');

// 加载评论的函数
function loadComments() {
    // 从localStorage中获取当前文章的评论数据，如果不存在则初始化为空数组
    const comments = JSON.parse(localStorage.getItem(articleKey)) || [];
    // 清空评论容器的内容
    commentsContainer.innerHTML = '';
    // 遍历评论数组
    comments.forEach((comment) => {
        // 创建一个div元素用于显示单条评论
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';

        // 创建游客头像
        const avatar = document.createElement('img');
        avatar.src = '../img/avatar.jpg'; // 设置头像图片路径
        avatar.alt = '游客头像'; // 设置头像的alt属性

        // 创建评论内容的容器
        const content = document.createElement('div');
        content.className = 'comment-content';
        // 设置评论内容的HTML，显示游客编号和评论内容
        content.innerHTML = `<strong>游客${comment.id.slice(-4)}:</strong> ${comment.text}`;

        // 创建删除按钮
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '删除'; // 设置按钮文本
        // 为删除按钮添加点击事件处理器
        deleteBtn.onclick = () => deleteComment(comment.id);

        // 将头像、评论内容和删除按钮添加到评论元素中
        commentElement.appendChild(avatar);
        commentElement.appendChild(content);
        commentElement.appendChild(deleteBtn);
        // 将评论元素添加到评论容器中
        commentsContainer.appendChild(commentElement);
    });
}

// 删除评论的函数
function deleteComment(id) {
    // 从localStorage中获取当前文章的评论数据
    const comments = JSON.parse(localStorage.getItem(articleKey)) || [];
    // 过滤掉需要删除的评论
    const newComments = comments.filter(comment => comment.id !== id);
    // 将新的评论数组存储回localStorage
    localStorage.setItem(articleKey, JSON.stringify(newComments));
    // 重新加载评论
    loadComments();
}

// 为评论表单添加提交事件处理器
commentForm.addEventListener('submit', (e) => {
    // 阻止表单的默认提交行为
    e.preventDefault();
    // 获取用户输入的评论内容，并去除首尾空格
    const commentText = document.getElementById('comment').value.trim();
    // 如果评论内容为空，则不进行后续操作
    if (!commentText) return;

    // 从localStorage中获取当前文章的评论数据
    const comments = JSON.parse(localStorage.getItem(articleKey)) || [];
    // 创建一个新的评论对象，包含唯一ID和评论内容
    comments.push({
        id: Date.now().toString(), // 使用当前时间戳作为唯一ID
        text: commentText
    });

    // 将新的评论数组存储回localStorage
    localStorage.setItem(articleKey, JSON.stringify(comments));
    // 清空评论输入框
    document.getElementById('comment').value = '';
    // 重新加载评论
    loadComments();
});

// 页面加载完成后，自动加载评论
loadComments();