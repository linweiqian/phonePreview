<template>
  <div>
        <!-- 头部导航 -->
        <div id="layout_header">
            <div class="header_navigation">
                <div class="navigation_left">
                    <div class="grid-demo grid-demo-bg1">
                        <ul class="layui-nav">
                            <li class="layui-nav-item"></li>
                            <li class="layui-nav-item layui-this"><a href="">首页</a></li>
                            <li class="layui-nav-item"><a href="">图库</a></li>
                            <li class="layui-nav-item ">
                                <a href="javascript:;">设计</a>
                                <dl class="layui-nav-child">
                                    <dd><a href="">选项1</a></dd>
                                    <dd><a href="">选项2</a></dd>
                                    <dd><a href="">选项3</a></dd>
                                </dl>
                            </li>
                            <li class="layui-nav-item ">
                                <a href="javascript:;">订单</a>
                                <dl class="layui-nav-child">
                                    <dd><a href="">移动模块</a></dd>
                                    <dd><a href="">后台模版</a></dd>
                                    <dd class="layui-this"><a href="">选中项</a></dd>
                                    <dd><a href="">电商平台</a></dd>
                                </dl>
                            </li>
                        </ul>
                    </div>

                </div>
                <div class="navigation_right  clearfix">
                    <div class="grid-demo fix_box">
                        <ul class="layui-nav">
                            <li class="layui-nav-item">
                                <a href="">个人中心<span class="layui-badge-dot"></span></a>
                            </li>
                            <li class="layui-nav-item" lay-unselect="">
                                <a href="javascript:;"><img src="//t.cn/RCzsdCq" class="layui-nav-img">我</a>
                                <dl class="layui-nav-child">
                                    <dd><a href="javascript:;">修改信息</a></dd>
                                    <dd><a href="javascript:;">安全管理</a></dd>
                                    <dd><a href="javascript:;">退了</a></dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 左侧导航 -->
        <div id="layout_left">
            <ul class="layui-nav layui-nav-tree layui-inline" lay-filter="demo" style="margin-right: 10px;">
                <li class="layui-nav-item layui-nav-itemed" style="padding-top:40px ;" >
                    <dl class="layui-nav-child">
                        <dd ><a href="javascript:;">手机预览</a></dd>
                        <dd><a href="javascript:;">订单详情</a></dd>
                        <dd><a href="javascript:;">暂定</a></dd>
                    </dl>
                </li>
            </ul>
        </div>
        <!-- 右侧导航 -->
        <div id="layout_right">
            <div class="title">欢迎光临</div>
            <div class="tab_content" >
                <div class="previewContent">
                    <custom></custom>
                </div>
                <div class="goodsContent">
                    <div class="order_content" style="border: 1px solid #ccc;">
                        <div class="selectBox">
                            <span class="com-search-tit">平台渠道:</span>
                            <div  class="com-search-cont"  v-for = '(item,index) in platform' @click='selected(item.name)' :key="index">
                                <a href="javascript:;" :class="{activeplatform : activeplatform == item.name}">{{item.name}}</a>
                            </div>
                            <div class="multi-select fr">
                                <a href="javascript:;">+</a>
                                <a href="javascript:;">多选</a>
                            </div>
                        </div>
                        <div class="selectBox">
                            <span class="com-search-tit">账<i class="nbsp"></i>号:</span>
                            <div class="com-search-cont">
                                <a href="javascript:;" class="activeCount">全部</a>
                            </div>
                            <div class="multi-btn-bar fr">
                                <a href="javascript:;">+</a>
                                <a href="javascript:;">多选</a>
                            </div>
                            <div class="multi-btn-bar fr">
                                <a href="javascript:;">+</a>
                                <a href="javascript:;">更多</a>
                            </div>
                        </div>
                        <div class="selectBox">
                            <span class="com-search-tit">匹配类型</span>
                            <div class="com-search-cont"  v-for = '(tab,index) in mathList' @click = 'activeplatClick(tab,index)' :key="index">
                                <a href="javascript:;" :class =" tab.isSelected?'prompt':'' ">{{tab.name}}</a>
                            </div>
                            <!-- <div class="com-search-cont">
                                <a href="javascript:;">未关联</a>
                            </div>
                            <div class="com-search-cont">
                                <a href="javascript:;">自动关联</a>
                            </div>
                            <div class="com-search-cont">
                                <a href="javascript:;">手动关联</a>
                            </div>
                            <div class="com-search-cont">
                                <a href="javascript:;">自建订单</a>
                            </div> -->
                            <div class="icon_prompt" id="icon_prompt">
                                <img :src="imagestitle" alt="">
                            </div>
                        </div>
                        <div class="selectBox">
                            <span class="com-search-tit">标<i class="nbsp"></i>记:</span>
                            <div class="com-search-cont">
                                <a href="javascript:;" :class="tag?'tagSelect':''" @click="tagClick()">全部</a>
                            </div>
                            <div class="com-search-cont" v-for="(con,index) in colorList" :key="index">
                                <a href="javascript:;" class="cube_color" :class="colorList[index].color"></a>
                                <img :src="flag?'../../images/pick.png':''" alt="" class="pickimage" />
                            </div>
                        </div>
                        <div class="com-search-tit clearfix">
                            <div class="layui-inline fl">
                                <label class="layui-form-label">导入时间:</label>
                                <div class="layui-input-inline">
                                    <input type="text" class="layui-input" id="test10" placeholder="开始时间~结束时间 ">
                                </div>
                            </div>
                            <div class="layui-inline fl">
                                <label class="layui-form-label" >订单编号:</label>
                                <input class="orderNumber" type="text" placeholder="多个订单用逗号或空格隔开">
                            </div>
                            <div class="layui-inline fl">
                                <button type="button" class="layui-btn layui-btn-normal layui-btn-radius">搜索</button>
                            </div>
                        </div>

                    </div>
                    <div class="goods_message" style="border: 1px solid #ccc;">
                        <!-- <div class="selectPage clearfix">
                            <div class="pager-info fl">

                                <label><input type="checkbox" name="like1[write]" lay-skin="primary" title="全选" checked="">全选</label>
                                &nbsp;|&nbsp;已选择&nbsp;<span>0</span>个,
                                共<span>0</span>&nbsp;个
                            </div>
                            <div class="pager-info fr">
                                <div id="demo7"></div>
                            </div>
                        </div> -->
                        <div class="demoTable">
                            搜索ID：
                            <div class="layui-inline">
                                <input class="layui-input" name="id" id="demoReload" autocomplete="off">
                            </div>
                            <button class="layui-btn" data-type="reload">搜索</button>
                        </div>

                        <table class="layui-hide" id="LAY_table_user" lay-filter="user"></table>
                    </div>
                </div>
                <div>无</div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from'jquery';
import custom from './components/custom.vue';
$(function(){
        $('.tab_content>div').hide();
        //通过 .index()方法获取元素下标，从0开始，赋值给某个变量
        var _index=0;
        $('#layout_left dd').click(function(){
            $('.title').css('display','none');

            _index = $(this).index();
            // console.log(_index);
            $(".tab_content>div").eq(_index).show().siblings().hide();
        })
        //让内容框的第 _index 个显示出来，其他的被隐藏
        //改变选中时候的选项框的样式，移除其他几个选项的样式
    })
    export default{
      name:"YmOrder",
      data(){
        return{
          platform:[
                    {
                        name:'全部'
                    },
                    {
                        name:'其它'
                    }
                ],
                activeplatform:'全部',
                mathList:[
                    {name:'全部',isSelected:true},
                    {name:'未关联',isSelected:false},
                    {name:'自动关联',isSelected:false},
                    {name:'手动关联',isSelected:false},
                    {name:'自建订单',isSelected:false},
                ],
                activeplat:0,
                colorList:[
                    {color:'red'},
                    {color:'green'},
                    {color:'pink'},
                    {color:'blue'}
                ],
                tag:true,
                flag:true,
                imagestitle:require('../src/assets/images/icon_prompt.png')
        }
      },
      methods:{
        selected(name){
                this.activeplatform = name;
            },
            activeplatClick(tab,index){
                this.activeplat = index;
                tab.isSelected = !tab.isSelected;
                this.mathList.forEach(tab=>{
                     if(index==0){
                         tab.isSelected = false;
                     }
                     // console.log(name,isSelected)
                })
                if(index == 0){
                    tab.isSelected = true;
                }
            },
            tagClick(){
                this.flag = false;
            }
      },
      components:{
        custom
      }
    }
</script>

<style scoped>
  /* @import url('./assets/custom.css'); */
  @import url('./assets/YmOrder.css');
</style>
