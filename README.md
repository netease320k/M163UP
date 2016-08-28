# M163UP
网易云音乐音质替换检查小组任务公示栏

## 依赖

- node
- webpack
- jekyll

## 运行
1. 克隆这个 repo

    ```
    git clone https://github.com/hufan-Akari/M163UP.git
    cd M163UP
    ```

2. 切换到本开发分支(dev)

    ```
    git checkout dev
    ```

3. 删除本地 gh-pages 分支

    <small>解释:因为我们用不到，仅仅使用 dev 分支下的 gh-pages 目录即可,也可以保留不删<small>

    ```
    git branch -d gh-pages
    ```

4. 安装 npm 依赖

    ```
    npm install
    ```

5. 开发环境

    ```
    npm start
    ```

6. 生成部署所需的文件

    ```
    npm run build:prod
    ```

7. 部署到 gh-pages 分支

    ```
    ./deploy.sh
    ```
