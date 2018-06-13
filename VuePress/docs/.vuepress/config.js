module.exports = {
    title:'My VuePress',
    description: 'Just playing around',
    dest:'./dist',
    base:'/dist/',
    serviceWorker: true,
    themeConfig:{
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav:[
            {text:'JS',link:'/JS/'},
            {text:'HTTP',link:'/HTTP/'},
            {text:'CSS',link:'/CSS/'},
            /*{
                text: 'Languages',
                items: [
                    { text: 'Chinese', link: '/language/chinese' },
                    { text: 'Japanese', link: '/language/japanese' }
                ]
            }*/
        ],
        sidebar:{
            '/JS/':[
                {
                    title:'JS',
                    collapsable: false,
                    children: [
                        '',
                        'Ajax',
                        'ES6',
                        'Front-end-frame-relative',
                        'Front-end-Developer-Questions',
                        'JavaScript',
                        'jQuery'
                    ]
                }
            ],
            '/HTTP/':[
                {
                    title:'HTTP',
                    collapsable: false,
                    children: [
                        '',
                        'HTML',
                        'HTTP'
                    ]
                }
            ],
            '/CSS/':[
                {
                    title:'CSS',
                    collapsable: false,
                    children: [
                        '',
                        'CSS'
                    ]
                }
            ]
        }
    }
}
function genSidebarConfig (title) {
    return [
        {
            title,
            collapsable: false,
            children: [
                '',
                'Ajax',
                'ES6',
                'Front-end-Developer-Questions',
                'Front-end-frame-relative',
                'JavaScript',
                'jQuery'
            ]
        }
    ]
}