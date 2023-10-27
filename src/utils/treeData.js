export default [{   
    "id":"002acb27-e463-4e52-a185-e0b3a77462f1",
    "menuType":"1",
    "name":"数据源加载",
    "path":"/loadPortal",
    "icon":"el-icon-upload",
    "children":[{
        "id":"005052ea-4f84-4626-88c9-e390b69e03cf",
        "menuType":"2",
        "name":"Portal数据",
        "path":"/loadPortal",
        component:'loadPortal',
    },{
        "id":"00acc7f0-2e32-4b44-a261-9d8d950fb5f6",
        "menuType":"2",
        "name":"URL数据",
        "path":"/loadURL",
        component:'loadURL',
    },{
        "id":"02968627-a093-4e32-85e6-e251ff56def0",
        "menuType":"2",
        "name":"本地矢量",
        "path":"/loadLocalShp",
        component:'loadLocalShp',
    },
]},{
    "id":"0de3b648-473c-46f9-81d5-4c9ff5934d11",
    "menuType":"1",
    "name":"图层加载",
    "path":"/loadLayer",
    "icon":"el-icon-location-information",
    "children":[{
        "id":"0ecacc9a-2f55-4e41-8b24-d5f6a68829cf",
        "menuType":"2",
        "name":"天地图",
        "path":"/loadtianditu",
        component:'loadtianditu',
    },{
        "id":"0314e244-f3cc-4262-be6b-f8a66bee2a6b",
        "menuType":"2",
        "name":"动态图层",
        "path":"/loadMapImageLayer",
        component:'loadMapImageLayer',
    },
    {
        "id":"0314e244-f3cc-4262-be6b-f8a66bee2a6c",
        "menuType":"2",
        "name":"倾斜摄影",
        "path":"/loadOSGB",
        component:'loadOSGB',
    },{
        "id":"0463faf8-4299-452e-901f-9e8ac317f130",
        "menuType":"2",
        "name":"点云数据",
        "path":"/loadPointCloud",
        component:'loadPointCloud',
    },
    {
        "id":"0463faf8-4299-452e-901f-9e8ac317f131",
        "menuType":"2",
        "name":"BIM模型",
        "path":"/loadBIM",
        component:'loadBIM',
    },
    {
        "id":"0463faf6-4299-452e-901f-9e8ac317f131",
        "menuType":"2",
        "name":"多媒体资源",
        "path":"/loadMedia",
        component:'loadMedia',
    }]
},
{
    "id":"0530a60c-cfd7-4279-8a9d-6f4756eb3295",
    "menuType":"1",
    "name":"空间几何",
    "path":"/cameraParam",
    "icon":"el-icon-s-order",
    "children":[{
        "id": "06cab70d-1fe3-463d-a3cd-d7ec5541243d",
        "menuType":"2",
        "name":"3D绘制",
        "path":"/3dPainting",
        component:'3dPainting',
    },{
        "id":"0860768e-4dfd-4fc8-9f77-76803d8917ff",
        "menuType":"2",
        "name":"3D量测",
        "path":"/3dMeasure",
        component:'3dMeasure',
    },{
        "id":"093dd218-f04e-4b56-88af-a76a36ca9e4c",
        "menuType":"2",
        "name":"几何查询",
        "path":"/geometryQuery",
        component:'geometryQuery',
    },{
        "id":"093dd218-f04e-4b56-88af-a76a36cb9e4c",
        "menuType":"2",
        "name":"路径规划",
        "path":"/routeQuery",
        component:'routeQuery',
    },{
        "id":"09698328-7437-471f-a9a9-fc55fbdbd722",
        "menuType":"2",
        "name":"屏幕截图",
        "path":"/screenStop",
        component:'screenStop',
    }
]},{
    "id":"0981de52-c541-445d-8d65-0de792922e43",
    "menuType":"1",
    "name":"空间分析",
    "path":"/lineOSight",
    "icon":"el-icon-s-data",
    "children":[{
        "id":"",
        "menuType":"2",
        "name":"视线分析",
        "path":"/lineOfSight",
        component:'lineOfSight',
    },{
        "id":"09a663d2-12e8-40fe-8c5a-ac0c3fb98c1b",
        "menuType":"2",
        "name":"视域分析",
        "path":"/visualField",
        component:'visualField',
    },{
        "id":"0a163bbe-ed6b-4f17-965b-03d931f397c1",
        "menuType":"2",
        "name":"建筑剖切",
        "path":"/sliceBIM",
        component:'sliceBIM',
    },{
        "id":"0a9c0e41-9cff-4635-9b05-336ed9f85ca1",
        "menuType":"2",
        "name":"高程剖面",
        "path":"/eleSection",
        component:'eleSection',
    }
]},{
    "id":"0b06a0d3-baf8-422e-99ac-ae0e4e5be891",
    "menuType":"1",
    "name":"三维模拟",
    "path":"/sunSimulation",
    "icon":"el-icon-s-marketing",
    "children":[{
        "id":"0b2c6278-fec5-4e23-b59a-f3b67b2a6209",
        "menuType":"2",
        "name":"日照分析",
        "path":"/sunSimulation",
        component:'sunSimulation',
    },{
        "id":"0b78da9e-55f0-4377-b210-bacd987f41ee",
        "menuType":"2",
        "name":"天气-雨",
        "path":"/rainSimulation",
        component:'rainSimulation',
    },{
        "id":"0cb4ae29-7341-4133-b281-28958b3638a3",
        "menuType":"2",
        "name":"天气-雪",
        "path":"/snowSimulation",
        component:'snowSimulation',
    },{
        "id":"0da0d2c4-485d-493c-a29f-7333f232c52d",
        "menuType":"2",
        "name":"水波纹",
        "path":"/waterSimulation",
        component:'waterSimulation',
    }
]},{
    "id":"0de3b648-473c-46f9-81d5-4c5ff5934d11",
    "menuType":"1",
    "name":"三维漫游",
    "path":"/aroundView",
    "icon":"el-icon-view",
    "children":[{
        "id":"059fa89c-7311-4690-ba9b-ffbbe2818a1a",
        "menuType":"2",
        "name":"位置参数",
        "path":"/cameraParam",
        component:'cameraParam',
    },{
        "id":"061619f9-c9ed-441e-82d5-f4a1d64915c3",
        "menuType":"2",
        "name":"定位",
        "path":"/location",
        component:'location',
    },{
        "id":"0ecacc9a-2f55-4e41-8b24-d5f6a68829cf",
        "menuType":"2",
        "name":"360环视",
        "path":"/aroundView",
        component:'aroundView',
    },{
        "id":"10246461-bf5e-43ef-bec2-10ad07d4c1d0",
        "menuType":"2",
        "name":"路径漫游",
        "path":"/pathView",
        component:'pathView',
    },{
        "id":"104af846-77f6-4c86-b4d1-86d09ce0f313",
        "menuType":"2",
        "name":"地上地下",
        "path":"/groundView",
        component:'groundView',
    }
]}]