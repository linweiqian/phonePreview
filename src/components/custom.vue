<template>
    <div>
        <!--工具栏-->
        <div id="toolBar"  class="animated fadeInDown">
            <div id="packageBox">
                <div class="h1">工具栏</div>
                <ul>
                    <li>
                        <div class="wrap">
                            <div class="upload">
                                <input type="file"
                                       accept="image/jpeg, image/png, image/jpg"
                                       @change="changeImage($event)"
                                       class="input-opacity">
                                上传图片
                            </div>
                        </div>
                    </li>
                    <li>
                        <button class="btnEdit" @click="btnEdit">定制效果</button>
                    </li>
                    <li>
                        <button id="bounced_btn" type="submit" @click="saveSubmit">保存提交</button>
                    </li>
                </ul>
            </div>
        </div>
        <!--     手机壳品牌选择 -->
        <div id="selectTypeBox" class="animated bounceInLeft">
            <el-tree :data="data" node-key="id" :key="treeKey" current-node-key :props="defaultProps"
                     highlight-current @current-change="handleNodeClick"  icon="el-icon-caret-top"
                     ref="tree"></el-tree>
        </div>
        <!--    手机壳展示-->
        <div id="container">

                <img class="pictureDisplay" :src="`./webapp/static/images/customImage/${imgSku}.png`">
                <canvas id="myCanvas"></canvas>
        </div>
        <!--    数量备注-->
        <div class="noteBox animated bounceInRight">
            <p style="font-size: 13px;color:#757575;margin-left: 6px">商品数量: <input type="text" class="inpNumber" style=" border-radius:8%;width: 100px;height: 10px;border:1px solid #A9A9A9;">
            </p>
            <p><textarea class="inpRemark"
                         style="width:200px; height:100px; line-height: 10px;  resize:none;  text-indent: 3px"
                         placeholder="备注:"></textarea></p>
        </div>
        <!-- 弹出层 -->
        <div class="bounced" id="bounced">
            <div class="messageBox">
                <span>截图(窗口大小可调节)</span>
                <a href="#" id="close_x">x</a>
            </div>
            <div class="imagePackage">
                <img :src="resImage" style="border: 1px solid #000">
<!--                <canvas id="showImage" style="border: 1px solid #000"></canvas>-->
            </div>
            <button id="btnTrue" @click="btnTrue">确定</button>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';
import { fabric } from 'fabric';
import 'fabric-customise-controls';
import rotateIcon from '../assets/images/rotate.png';
import deleteIcon from '../assets/images/delete.png';
import moveIcon from '../assets/images/move.png';
import scaleIcon from '../assets/images/scale.png';
export default {
        name: "Custom",
        data() {
            return {
                url: '',//图片路径
                imgArr: [],//图片路径数组
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                treeKey: '',
                imgSku: '',//图片sku
                data: [
                    {
                        label: '手机配件',
                        children: [{
                            label: '手机壳',
                            children: [
                                {
                                    label: 'htc',
                                    children: [
                                        {
                                            label: "透明壳",
                                            children: [
                                                {
                                                    label: 'HTC 820',
                                                    sku: 'ZYUHTC820',
                                                    x: 222,
                                                    y: 33,
                                                    height: 741,
                                                    width: 384
                                                },
                                                {
                                                    label: 'HTC M9',
                                                    sku: 'ZYUHTCM9',
                                                    x: 217,
                                                    y: 28,
                                                    height: 734,
                                                    width: 378
                                                },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    label: '华为',
                                    children: [
                                        {
                                            label: "透明壳",
                                            children: [
                                                {
                                                    label: '华为荣耀 10',
                                                    sku: 'ZYUHWH10',
                                                    x: 211,
                                                    y: 26,
                                                    width: 372,
                                                    height: 747

                                                },
                                                {
                                                    label: '华为荣耀 10Lite/ P Smart(2019)',
                                                    sku: 'ZYUHWH10LITE',
                                                    x: 231,
                                                    y: 25,
                                                    width: 381,
                                                    height: 762
                                                },
                                                {
                                                    label: '华为荣耀 8X',
                                                    sku: 'ZYUHWH8X',
                                                    x: 220,
                                                    y: 23,
                                                    width: 363,
                                                    height: 756
                                                },
                                                {
                                                    label: '华为荣耀 9 Lite/P Smart/畅享7S',
                                                    sku: 'ZYUHWH9LITE',
                                                    x: 222,
                                                    y: 23,
                                                    width: 374,
                                                    height: 767
                                                },
                                                {
                                                    label: '华为荣耀 Play',
                                                    sku: 'ZYUHWHPLAY',
                                                    x: 226,
                                                    y: 24,
                                                    width: 367,
                                                    height: 751
                                                },
                                                {
                                                    label: '华为 Y7 prime (2018)',
                                                    sku: 'ZYUHWY7PRIME18',
                                                    x: 220,
                                                    y: 23,
                                                    width: 376,
                                                    height: 754
                                                },
                                                {
                                                    label: '华为荣耀 V10',
                                                    sku: 'ZYUHWHV10',
                                                    x: 218,
                                                    y: 28,
                                                    width: 376,
                                                    height: 754
                                                },
                                                {
                                                    label: '华为荣耀 V20',
                                                    sku: 'ZYUHWHV20',
                                                    x: 209,
                                                    y: 22,
                                                    width: 375,
                                                    height: 768
                                                },
                                                {
                                                    label: '华为 Mate20',
                                                    sku: 'ZYUHWMATE20',
                                                    x: 216,
                                                    y: 14,
                                                    width: 375,
                                                    height: 768
                                                },
                                                {
                                                    label: '华为 Mate20 Lite',
                                                    sku: 'ZYUHWMATE20LITE',
                                                    x: 229,
                                                    y: 28,
                                                    width: 375,
                                                    height: 750
                                                },
                                                {
                                                    label: '华为 Mate 20 Pro',
                                                    sku: 'ZYUHWMATE20PRO',
                                                    x: 220,
                                                    y: 30,
                                                    width: 361,
                                                    height: 749

                                                },
                                                {
                                                    label: '华为 Mate SE',
                                                    sku: 'ZYUHWMATESE',
                                                    x: 215,
                                                    y: 29,
                                                    width: 375,
                                                    height: 756
                                                },
                                                {
                                                    label: '华为 P20',
                                                    sku: 'ZYUHWP20',
                                                    x: 231,
                                                    y: 34,
                                                    width: 376,
                                                    height: 748


                                                },
                                                {
                                                    label: '华为 P20 Lite/Nova 3e',
                                                    sku: 'ZYUHWP20LITE',
                                                    x: 221,
                                                    y: 28,
                                                    width: 373,
                                                    height: 753
                                                },
                                                {
                                                    label: '华为 P20 Pro',
                                                    sku: 'ZYUHWP20PRO',
                                                    x: 227,
                                                    y: 22,
                                                    width: 375,
                                                    height: 764
                                                },
                                                {
                                                    label: '华为 P30',
                                                    sku: 'ZYUHWP30',
                                                    x: 236,
                                                    y: 25,
                                                    width: 368,
                                                    height: 749
                                                },
                                                {
                                                    label: '华为 P30 Lite/Nova 4e',
                                                    sku: 'ZYUHWP30LITE',
                                                    x: 228,
                                                    y: 30,
                                                    width: 377,
                                                    height: 757
                                                },
                                                {
                                                    label: '华为 P30 Pro',
                                                    sku: 'ZYUHWP30PRO',
                                                    x: 234,
                                                    y: 23,
                                                    width: 356,
                                                    height: 755
                                                },
                                                {
                                                    label: '华为 Y6 (2019)',
                                                    sku: 'ZYUHWY619',
                                                    x: 223,
                                                    y: 26,
                                                    width: 369,
                                                    height: 752
                                                },
                                                {
                                                    label: '华为 Y6 Prime (2018)',
                                                    sku: 'ZYUHWY6PRIME18',
                                                    x: 220,
                                                    y: 23,
                                                    width: 381,
                                                    height: 758
                                                },
                                                {
                                                    label: '华为荣耀 6X',
                                                    sku: 'ZYUHWH6X',
                                                    x: 217,
                                                    y: 35,
                                                    width: 380,
                                                    height: 728
                                                },
                                                {
                                                    label: '华为荣耀 7',
                                                    sku: 'ZYUHWH7',
                                                    x: 223,
                                                    y: 41,
                                                    width: 374,
                                                    height: 750
                                                },
                                                {
                                                    label: '华为荣耀 8',
                                                    sku: 'ZYUHWH8',
                                                    x: 218,
                                                    y: 32,
                                                    width: 364,
                                                    height: 724
                                                },
                                                {
                                                    label: '华为荣耀 9',
                                                    sku: 'ZYUHWH9',
                                                    x: 227,
                                                    y: 22,
                                                    width: 379,
                                                    height: 759
                                                }, {
                                                    label: '华为 Mate 10 Lite/华为 Nova 2i',
                                                    sku: 'ZYUHWMATE10LITE',
                                                    x: 231,
                                                    y: 25,
                                                    width: 381,
                                                    height: 762
                                                }, {
                                                    label: '华为 Mate 10 Pro',
                                                    sku: 'ZYUHWMATE10PRO',
                                                    x: 208,
                                                    y: 32,
                                                    width: 374,
                                                    height: 758
                                                }, {
                                                    label: '华为 Mate 9',
                                                    sku: 'ZYUHWMATE9',
                                                    x: 213,
                                                    y: 27,
                                                    width: 369,
                                                    height: 744
                                                }, {
                                                    label: '华为 P10',
                                                    sku: 'ZYUHWP10',
                                                    x: 213,
                                                    y: 30,
                                                    width: 383,
                                                    height: 746
                                                },
                                                {
                                                    label: '华为 P10 Lite/Nova Lite',
                                                    sku: 'ZYUHWP10LITE',
                                                    x: 210,
                                                    y: 23,
                                                    width: 386,
                                                    height: 757
                                                }, {
                                                    label: '华为 P10 Plus',
                                                    sku: 'ZYUHWP10PLUS',
                                                    x: 212,
                                                    y: 17,
                                                    width: 390,
                                                    height: 768
                                                }, {
                                                    label: '华为 P8 Lite',
                                                    sku: 'ZYUHWP8LITE',
                                                    x: 206,
                                                    y: 23,
                                                    width: 382,
                                                    height: 756
                                                }, {
                                                    label: '华为 P9',
                                                    sku: 'ZYUHWP9',
                                                    x: 213,
                                                    y: 30,
                                                    width: 380,
                                                    height: 743
                                                }, {
                                                    label: '华为 P9 Lite',
                                                    sku: 'ZYUHWP9LITE',
                                                    x: 213,
                                                    y: 27,
                                                    width: 384,
                                                    height: 751
                                                }, {
                                                    label: '华为 Y517/Y617',
                                                    sku: 'ZYUHWY517',
                                                    x: 206,
                                                    y: 24,
                                                    width: 380,
                                                    height: 759
                                                }, {
                                                    label: '华为荣耀 7A/华为 Y6(2018)',
                                                    sku: 'ZYUHWH7A',
                                                    x: 226,
                                                    y: 25,
                                                    width: 365,
                                                    height: 746

                                                }, {
                                                    label: '华为荣耀畅玩 7S/华为 Y5(2018)',
                                                    sku: 'ZYUHWH7S',
                                                    x: 223,
                                                    y: 29,
                                                    width: 373,
                                                    height: 739
                                                }, {
                                                    label: '华为荣耀 8C',
                                                    sku: 'ZYUHWH8C',
                                                    x: 227,
                                                    y: 34,
                                                    width: 358,
                                                    height: 743
                                                }, {
                                                    label: '华为荣耀 9i/华为荣耀 9N',
                                                    sku: 'ZYUHWH9I',
                                                    x: 226,
                                                    y: 27,
                                                    width: 366,
                                                    height: 746
                                                }, {
                                                    label: '荣耀20/荣耀20 lite',
                                                    sku: 'ZYUHWH20',
                                                    x: 220,
                                                    y: 19,
                                                    width: 366,
                                                    height: 761

                                                }, {
                                                    label: 'Nova 5/Nova 5 Plus',
                                                    sku: 'ZYUHWNOVA5',
                                                    x: 225,
                                                    y: 21,
                                                    width: 337,
                                                    height: 758
                                                }, {
                                                    label: '华为 Y6 Pro(2019)',
                                                    sku: 'ZYUHWY6PRO19',
                                                    x: 222,
                                                    y: 16,
                                                    width: 358,
                                                    height: 763
                                                }, {
                                                    label: '华为 Y7 Pro(2019)',
                                                    sku: 'ZYUHWY7PRO19',
                                                    x: 240,
                                                    y: 31,
                                                    width: 363,
                                                    height: 746
                                                }, {
                                                    label: '华为 Mate 30',
                                                    sku: 'ZYUHWMATE30',
                                                    x: 225,
                                                    y: 30,
                                                    width: 353,
                                                    height: 747
                                                }, {
                                                    label: '华为 Mate 30 Pro',
                                                    sku: 'ZYUHWMATE30PRO',
                                                    x: 226,
                                                    y: 27,
                                                    width: 351,
                                                    height: 747
                                                }, {
                                                    label: '华为 Mate 30 Lite/Nova 5i Pro',
                                                    sku: 'ZYUHWMATE30LITE',
                                                    x: 218,
                                                    y: 25,
                                                    width: 374,
                                                    height: 753
                                                }, {
                                                    label: '华为 Y9 prime19/P SMART Z',
                                                    sku: 'ZYUHWY9PRIME19',
                                                    x: 220,
                                                    y: 29,
                                                    width: 360,
                                                    height: 741
                                                }, {
                                                    label: '华为荣耀 9X',
                                                    sku: 'ZYUHWH9X',
                                                    x: 226,
                                                    y: 19,
                                                    width: 362,
                                                    height: 766
                                                }, {
                                                    label: '华为 Y5 (2019)',
                                                    sku: 'ZYUHWY519',
                                                    x: 219,
                                                    y: 25,
                                                    width: 363,
                                                    height: 747
                                                }, {
                                                    label: '华为 Y7 (2019)',
                                                    sku: 'ZYUHWY719',
                                                    x: 240,
                                                    y: 31,
                                                    width: 354,
                                                    height: 752
                                                }, {
                                                    label: '华为 Y9(2019)',
                                                    sku: 'ZYUHWY919',
                                                    x: 219,
                                                    y: 25,
                                                    width: 354,
                                                    height: 743
                                                }, {
                                                    label: '荣耀 20 lite',
                                                    sku: 'ZSCBKHWH20LITE',
                                                    x: 228,
                                                    y: 37,
                                                    width: 346,
                                                    height: 727
                                                }, {
                                                    label: '华为 nove 5i',
                                                    sku: 'ZSCBKHWNOVA5I',
                                                    x: 231,
                                                    y: 43,
                                                    width: 341,
                                                    height: 712
                                                }, {
                                                    label: '华为 mate 10 pro',
                                                    sku: 'ZSCBKHWMATE10PRO',
                                                    x: 225,
                                                    y: 37,
                                                    width: 353,
                                                    height: 727
                                                }, {
                                                    label: '华为 nove 2',
                                                    sku: 'ZSCBKHWNOVA2',
                                                    x: 226,
                                                    y: 43,
                                                    width: 351,
                                                    height: 714
                                                }, {
                                                    label: '华为 nove 5',
                                                    sku: 'ZSCBKHWNOVA5',
                                                    x: 235,
                                                    y: 27,
                                                    width: 331,
                                                    height: 747
                                                }, {
                                                    label: '华为 p8 lite',
                                                    sku: 'ZSCBKHWH8LITE',
                                                    x: 225,
                                                    y: 36,
                                                    width: 355,
                                                    height: 730
                                                }, {
                                                    label: '华为 p10',
                                                    sku: 'ZSCBKHWP10',
                                                    x: 227,
                                                    y: 27,
                                                    width: 353,
                                                    height: 746
                                                }, {
                                                    label: '华为 y5 2017',
                                                    sku: 'ZSCBKHWY517',
                                                    x: 213,
                                                    y: 21,
                                                    width: 371,
                                                    height: 760
                                                }, {
                                                    label: '华为 y7 2017',
                                                    sku: 'ZSCBKHWY717',
                                                    x: 221,
                                                    y: 44,
                                                    width: 344,
                                                    height: 696
                                                }, {
                                                    label: '华为 荣耀 8',
                                                    sku: 'ZSCBKHWH8',
                                                    x: 221,
                                                    y: 43,
                                                    width: 352,
                                                    height: 725
                                                }, {
                                                    label: '华为 荣耀 9',
                                                    sku: 'ZSCBKHWHV9',
                                                    x: 221,
                                                    y: 27,
                                                    width: 361,
                                                    height: 750
                                                }, {
                                                    label: '华为 荣耀 20 pro',
                                                    sku: 'ZSCBKHWH20PRO',
                                                    x: 226,
                                                    y: 29,
                                                    width: 354,
                                                    height: 744
                                                }, {
                                                    label: '华为 荣耀 play',
                                                    sku: 'ZSCBKHWHPLAY',
                                                    x: 231,
                                                    y: 29,
                                                    width: 347,
                                                    height: 743
                                                }, {
                                                    label: '华为 荣耀 v9',
                                                    sku: 'ZSCBKHWHV9',
                                                    x: 228,
                                                    y: 33,
                                                    width: 355,
                                                    height: 730
                                                }, {
                                                    label: '华为 荣耀 v10',
                                                    sku: 'ZSCBKHWHV10',
                                                    x: 230,
                                                    y: 35,
                                                    width: 343,
                                                    height: 732
                                                }, {
                                                    label: '华为 荣耀 7c',
                                                    sku: 'ZSCBKHWH7C',
                                                    x: 235,
                                                    y: 36,
                                                    width: 337,
                                                    height: 725
                                                }, {
                                                    label: '华为 荣耀 v20',
                                                    sku: 'ZSCBKHWHV20',
                                                    x: 222,
                                                    y: 34,
                                                    width: 361,
                                                    height: 750
                                                }, {
                                                    label: '华为 荣耀 20',
                                                    sku: 'ZSCBKHWH20',
                                                    x: 224,
                                                    y: 35,
                                                    width: 346,
                                                    height: 747
                                                },
                                            ]
                                        },
                                        {
                                            label: "糖果壳",
                                            children: [
                                                {
                                                    label: '华为 荣耀 9 lite',
                                                    x: 219,
                                                    y: 23,
                                                    width: 363,
                                                    height: 752,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWH9LITE'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWH9LITE'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWH9LITE'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWH9LITE'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWH9LITE'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWH9LITE'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWH9LITE'
                                                        },
                                                    ]
                                                }, {
                                                    label: '华为 Mate 10 Lite/Nova 2i',
                                                    x: 215,
                                                    y: 22,
                                                    width: 369,
                                                    height: 756,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWMATE10LITE'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWMATE10LITE'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWMATE10LITE'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWMATE10LITE'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWMATE10LITE'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWMATE10LITE'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWMATE10LITE'
                                                        },
                                                    ]
                                                }, {
                                                    label: '华为 Mate 20 Lite',
                                                    x: 220,
                                                    y: 22,
                                                    width: 361,
                                                    height: 756,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWMATE20LITE'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWMATE20LITE'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWMATE20LITE'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWMATE20LITE'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWMATE20LITE'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWMATE20LITE'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWMATE20LITE'
                                                        },
                                                    ]
                                                }, {
                                                    label: '华为 Mate 20 Pro',
                                                    x: 215,
                                                    y: 22,
                                                    width: 370,
                                                    height: 756,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWMATE20PRO'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWMATE20PRO'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWMATE20PRO'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWMATE20PRO'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWMATE20PRO'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWMATE20PRO'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWMATE20PRO'
                                                        },
                                                    ]
                                                }, {
                                                    label: '华为 P10 Lite/Nova Lite',
                                                    x: 212,
                                                    y: 22,
                                                    width: 377,
                                                    height: 756,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWP10LITE'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWP10LITE'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWP10LITE'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWP10LITE'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWP10LITE'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWP10LITE'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWP10LITE'
                                                        },
                                                    ]
                                                }, {
                                                    label: '华为 P20',
                                                    x: 217,
                                                    y: 22,
                                                    width: 367,
                                                    height: 756,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWP20'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWP20'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWP20'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWP20'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWP20'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWP20'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWP20'
                                                        },
                                                    ]

                                                }, {
                                                    label: '华为 P20 Lite/Nova 3e',
                                                    x: 217,
                                                    y: 22,
                                                    width: 367,
                                                    height: 756,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWP20LITE'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWP20LITE'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWP20LITE'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWP20LITE'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWP20LITE'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWP20LITE'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWP20LITE'
                                                        },
                                                    ]
                                                }, {
                                                    label: '华为 P20 Pro',
                                                    x: 217,
                                                    y: 22,
                                                    width: 367,
                                                    height: 756,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWP20PRO'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWP20PRO'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWP20PRO'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWP20PRO'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWP20PRO'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWP20PRO'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWP20PRO'
                                                        },
                                                    ]

                                                }, {
                                                    label: '华为 P30',
                                                    x: 217,
                                                    y: 22,
                                                    width: 367,
                                                    height: 756,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWP30'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWP30'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWP30'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWP30'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWP30'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWP30'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWP30'
                                                        },
                                                    ]
                                                }, {
                                                    label: '华为 P30 Lite/Nova 4e',
                                                    x: 217,
                                                    y: 22,
                                                    width: 367,
                                                    height: 756,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWP30LITE'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWP30LITE'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWP30LITE'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWP30LITE'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWP30LITE'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWP30LITE'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWP30LITE'
                                                        },
                                                    ]

                                                }, {
                                                    label: '华为 P30 Pro',
                                                    x: 220,
                                                    y: 21,
                                                    width: 361,
                                                    height: 759,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWP30PRO'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWP30PRO'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWP30PRO'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWP30PRO'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWP30PRO'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWP30PRO'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWP30PRO'
                                                        },
                                                    ]

                                                }, {
                                                    label: '华为 P9 Lite',
                                                    x: 210,
                                                    y: 22,
                                                    width: 380,
                                                    height: 756,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWP9LITE'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWP9LITE'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWP9LITE'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWP9LITE'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWP9LITE'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWP9LITE'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWP9LITE'
                                                        },
                                                    ]

                                                }, {
                                                    label: 'Huawei Y5 (2018)/Y5 Prime18',
                                                    x: 210,
                                                    y: 22,
                                                    width: 380,
                                                    height: 756,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWY518'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWY518'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWY518'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWY518'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWY518'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWY518'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWY518'
                                                        },
                                                    ]

                                                }, {
                                                    label: 'Huawei Y6 (2018)',
                                                    x: 217,
                                                    y: 22,
                                                    width: 367,
                                                    height: 756,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWP30LITE'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWP30LITE'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWP30LITE'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWP30LITE'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWP30LITE'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWP30LITE'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWP30LITE'
                                                        },
                                                    ]

                                                }, {
                                                    label: 'Huawei Y6 Prime (2018)',
                                                    x: 217,
                                                    y: 22,
                                                    width: 367,
                                                    height: 756,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWY6PRIME18'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWY6PRIME18'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWY6PRIME18'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWY6PRIME18'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWY6PRIME18'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWY6PRIME18'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWY6PRIME18'
                                                        },
                                                    ]

                                                }, {
                                                    label: 'Huawei Honor 10',
                                                    x: 217,
                                                    y: 22,
                                                    width: 367,
                                                    height: 756,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWH10'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWH10'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWH10'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWH10'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWH10'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWH10'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWH10'
                                                        },
                                                    ]

                                                }, {
                                                    label: 'Huawei Honor 10 Lite/ P Smart (2019)',
                                                    x: 217,
                                                    y: 22,
                                                    width: 367,
                                                    height: 756,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWH10LITE'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWH10LITE'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWH10LITE'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWH10LITE'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWH10LITE'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWH10LITE'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWH10LITE'
                                                        },
                                                    ]

                                                }, {
                                                    label: 'Huawei Honor 8x',
                                                    x: 217,
                                                    y: 22,
                                                    width: 367,
                                                    height: 756,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWH8X'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWH8X'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWH8X'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWH8X'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWH8X'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWH8X'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWH8X'
                                                        },
                                                    ]

                                                }, {
                                                    label: 'Huawei Honor 9 Lite',
                                                    x: 219,
                                                    y: 23,
                                                    width: 363,
                                                    height: 752,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWH9LITE'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWH9LITE'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWH9LITE'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWH9LITE'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWH9LITE'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWH9LITE'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWH9LITE'
                                                        },
                                                    ]

                                                }, {
                                                    label: '华为 Mate 30',
                                                    x: 220,
                                                    y: 21,
                                                    width: 361,
                                                    height: 759,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWMATE30'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWMATE30'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWMATE30'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWMATE30'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWMATE30'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWMATE30'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWMATE30'
                                                        },
                                                    ]

                                                }, {
                                                    label: '华为 Mate 30 Pro',
                                                    x: 220,
                                                    y: 21,
                                                    width: 361,
                                                    height: 759,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWMATE30PRO'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWMATE30PRO'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWMATE30PRO'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWMATE30PRO'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWMATE30PRO'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWMATE30PRO'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWMATE30PRO'
                                                        },
                                                    ]

                                                }, {
                                                    label: '华为 Mate 30 Lite/Nova 5i Pro',
                                                    x: 220,
                                                    y: 48,
                                                    width: 362,
                                                    height: 706,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWMATE30LITE'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWMATE30LITE'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWMATE30LITE'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWMATE30LITE'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWMATE30LITE'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWMATE30LITE'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWMATE30LITE'
                                                        },
                                                    ]

                                                }, {
                                                    label: '华为 Y9 prime19/P SMART Z',
                                                    x: 222,
                                                    y: 48,
                                                    width: 357,
                                                    height: 705,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWY9PRIME19'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWY9PRIME19'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWY9PRIME19'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWY9PRIME19'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWY9PRIME19'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWY9PRIME19'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWY9PRIME19'
                                                        },
                                                    ]

                                                }, {
                                                    label: '华为荣耀 9X',
                                                    x: 222,
                                                    y: 48,
                                                    width: 357,
                                                    height: 706,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWH9X'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWH9X'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWH9X'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWH9X'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWH9X'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWH9X'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWH9X'
                                                        },
                                                    ]

                                                }, {
                                                    label: '华为 Y5 (2019)',
                                                    x: 222,
                                                    y: 48,
                                                    width: 357,
                                                    height: 709,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLHWY519'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKHWY519'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDHWY519'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNHWY519'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEHWY519'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRHWY519'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKHWY519'
                                                        },

                                                    ]

                                                }
                                            ]
                                        }

                                    ]
                                },
                                {
                                    label: 'iphone',
                                    children: [
                                        {
                                            label: "透明壳",
                                            children: [
                                                {
                                                    label: '苹果 i4/4s',
                                                    sku: 'ZYUIPI4',
                                                    x: 224,
                                                    y: 20,
                                                    width: 392,
                                                    height: 767
                                                },
                                                {
                                                    label: '苹果 i5/5s/SE',
                                                    sku: 'ZYUIPI5',
                                                    x: 235,
                                                    y: 27,
                                                    width: 359,
                                                    height: 742
                                                },
                                                {
                                                    label: '苹果 5C',
                                                    sku: 'ZYUIP5C',
                                                    x: 214,
                                                    y: 20,
                                                    width: 369,
                                                    height: 762
                                                },
                                                {
                                                    label: '苹果 6P/6sP',
                                                    sku: 'ZYUIP6P',
                                                    x: 222,
                                                    y: 27,
                                                    width: 373,
                                                    height: 762
                                                },
                                                {
                                                    label: '苹果 i6/6s',
                                                    sku: 'ZYUIPI6',
                                                    x: 223,
                                                    y: 22,
                                                    width: 373,
                                                    height: 762
                                                },
                                                {
                                                    label: '苹果 7P/8P',
                                                    sku: 'ZYUIP7P',
                                                    x: 214,
                                                    y: 29,
                                                    width: 389,
                                                    height: 747
                                                },
                                                {
                                                    label: '苹果 i7/i8',
                                                    sku: 'ZYUIPI7',
                                                    x: 219,
                                                    y: 25,
                                                    width: 371,
                                                    height: 755
                                                },
                                                {
                                                    label: '苹果 iX',
                                                    sku: 'ZYUIPIX',
                                                    x: 224,
                                                    y: 27,
                                                    width: 387,
                                                    height: 752
                                                },
                                                {
                                                    label: '苹果 XR',
                                                    sku: 'ZYUIPXR',
                                                    x: 213,
                                                    y: 22,
                                                    width: 396,
                                                    height: 760
                                                },
                                                {
                                                    label: '苹果 XS',
                                                    sku: 'ZYUIPXS',
                                                    x: 208,
                                                    y: 35,
                                                    width: 388,
                                                    height: 744
                                                },
                                                {
                                                    label: '苹果 11',
                                                    sku: 'ZYUIPI11',
                                                    x: 214,
                                                    y: 26,
                                                    width: 388,
                                                    height: 744
                                                }, {
                                                    label: '苹果 XS Max',
                                                    sku: 'ZYUIPXSMAX',
                                                    x: 204,
                                                    y: 29,
                                                    width: 380,
                                                    height: 733
                                                }, {
                                                    label: '苹果 11 pro',
                                                    sku: 'ZYUIP11PRO',
                                                    x: 207,
                                                    y: 28,
                                                    width: 383,
                                                    height: 783
                                                }, {
                                                    label: '苹果 11 Pro Max',
                                                    sku: 'ZYUIP11PROMAX',
                                                    x: 207,
                                                    y: 28,
                                                    width: 386,
                                                    height: 738
                                                },
                                            ]
                                        },
                                        {
                                            label: "糖果壳",
                                            children: [
                                                {
                                                    label: '苹果 5/5s/SE',
                                                    x: 217,
                                                    y: 31,
                                                    width: 369,
                                                    height: 735,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLIPI5'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKIPI5'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDIPI5'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNIPI5'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEIPI5'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRIPI5'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKIPI5'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: '苹果 6/6S',
                                                    x: 216,
                                                    y: 32,
                                                    width: 368,
                                                    height: 727,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLIPI6'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKIPI6'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDIPI6'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNIPI6'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEIPI6'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRIPI6'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKIPI6'
                                                        },
                                                    ]

                                                },
                                                {
                                                    label: '苹果 6 Plus/6S Plus',
                                                    x: 218,
                                                    y: 32,
                                                    width: 367,
                                                    height: 726,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLIP6P'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKIP6P'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDIP6P'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNIP6P'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEIP6P'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRIP6P'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKIP6P'
                                                        },
                                                    ]

                                                },
                                                {
                                                    label: '苹果 7/8',
                                                    x: 224,
                                                    y: 40,
                                                    width: 361,
                                                    height: 713,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLIPI7'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKIPI7'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDIPI7'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNIPI7'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEIPI7'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRIPI7'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKIPI7'
                                                        },
                                                    ]

                                                },
                                                {
                                                    label: '苹果 7 Plus/8 Plus',
                                                    x: 207,
                                                    y: 25,
                                                    width: 361,
                                                    height: 703,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLIP7P'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKIP7P'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDIP7P'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNIP7P'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEIP7P'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRIP7P'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKIP7P'
                                                        },
                                                    ]

                                                },
                                                {
                                                    label: '苹果 5/5s/SE',
                                                    x: 217,
                                                    y: 31,
                                                    width: 369,
                                                    height: 735,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLIPI5'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKIPI5'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDIPI5'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNIPI5'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEIPI5'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRIPI5'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKIPI5'
                                                        },
                                                    ]

                                                },
                                                {
                                                    label: '苹果 X',
                                                    x: 221,
                                                    y: 47,
                                                    width: 365,
                                                    height: 707,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLIPIX'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKIPIX'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDIPIX'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNIPIX'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEIPIX'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRIPIX'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKIPIX'
                                                        },
                                                    ]

                                                },
                                                {
                                                    label: '苹果 XR',
                                                    x: 208,
                                                    y: 26,
                                                    width: 365,
                                                    height: 704,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLIPXR'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKIPXR'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDIPXR'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNIPXR'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEIPXR'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRIPXR'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKIPXR'
                                                        },
                                                    ]

                                                },
                                                {
                                                    label: '苹果 XS',
                                                    x: 216,
                                                    y: 32,
                                                    width: 368,
                                                    height: 727,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLIPXS'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKIPXS'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDIPXS'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNIPXS'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEIPXS'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRIPXS'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKIPXS'
                                                        },
                                                    ]

                                                }, {
                                                    label: '苹果 XS Max',
                                                    x: 216,
                                                    y: 32,
                                                    width: 369,
                                                    height: 726,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLIPXSMAX'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKIPXSMAX'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDIPXSMAX'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNIPXSMAX'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEIPXSMAX'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRIPXSMAX'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKIPXSMAX'
                                                        },
                                                    ]

                                                }, {
                                                    label: '苹果 11',
                                                    x: 218,
                                                    y: 41,
                                                    width: 365,
                                                    height: 708,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLIPI11'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKIPI11'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDIPI11'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNIPI11'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEIPI11'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRIPI11'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKIPI11'
                                                        },
                                                    ]

                                                }, {
                                                    label: '苹果 11 Pro',
                                                    x: 217,
                                                    y: 46,
                                                    width: 365,
                                                    height: 708,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLIP11PRO'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKIP11PRO'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDIP11PRO'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNIP11PRO'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEIP11PRO'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRIP11PRO'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKIP11PRO'
                                                        },
                                                    ]

                                                }, {
                                                    label: '苹果 11 Pro Max',
                                                    x: 219,
                                                    y: 46,
                                                    width: 362,
                                                    height: 708,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLIP11PROMAX'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKIP11PROMAX'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDIP11PROMAX'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNIP11PROMAX'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEIP11PROMAX'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRIP11PROMAX'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKIP11PROMAX'
                                                        },
                                                    ]

                                                },
                                            ]
                                        }

                                    ]
                                },
                                {
                                    label: '摩托罗拉',
                                    children: [
                                        {
                                            label: "透明壳",
                                            children: [
                                                {
                                                    label: '摩托罗拉 G6',
                                                    sku: 'ZYUMTG6',
                                                    x: 221,
                                                    y: 30,
                                                    width: 370,
                                                    height: 739
                                                },
                                                {
                                                    label: '摩托罗拉 G6 Play/E5',
                                                    sku: 'ZYUMTG6PLAY',
                                                    x: 216,
                                                    y: 27,
                                                    width: 367,
                                                    height: 740
                                                },
                                                {
                                                    label: '摩托罗拉 G6 Plus',
                                                    sku: 'ZYUMTG6PLUS',
                                                    x: 267,
                                                    y: 38,
                                                    width: 368,
                                                    height: 754
                                                },
                                                {
                                                    label: '摩托罗拉 G5 Plus',
                                                    sku: 'ZYUMTG5PLUS',
                                                    x: 210,
                                                    y: 22,
                                                    width: 379,
                                                    height: 762
                                                },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    label: '三星',
                                    children: [
                                        {
                                            label: "透明壳",
                                            children: [
                                                {
                                                    label: '三星 A618',
                                                    sku: 'ZYUSSA618',
                                                    x: 220,
                                                    y: 28,
                                                    width: 360,
                                                    height: 748
                                                },
                                                {
                                                    label: '三星 A6Plus(2018)/A9star Lite',
                                                    sku: 'ZYUSSA6PLUS18',
                                                    x: 230,
                                                    y: 25,
                                                    width: 358,
                                                    height: 750
                                                },
                                                {
                                                    label: '三星 A717',
                                                    sku: 'ZYUSSA717',
                                                    x: 220,
                                                    y: 30,
                                                    width: 367,
                                                    height: 741
                                                },
                                                {
                                                    label: '三星 A718',
                                                    sku: 'ZYUSSA718',
                                                    x: 224,
                                                    y: 29,
                                                    width: 364,
                                                    height: 740
                                                },
                                                {
                                                    label: '三星 A818/A518',
                                                    sku: 'ZYUSSA818',
                                                    x: 225,
                                                    y: 28,
                                                    width: 360,
                                                    height: 746

                                                },
                                                {
                                                    label: '三星 A8Plus (2018)',
                                                    sku: 'ZYUSSA8PLUS18',
                                                    x: 226,
                                                    y: 17,
                                                    width: 380,
                                                    height: 757
                                                },
                                                {
                                                    label: '三星 A918/A9StarPro/A9S',
                                                    sku: 'ZYUSSA918',
                                                    x: 231,
                                                    y: 26,
                                                    width: 357,
                                                    height: 749
                                                },
                                                {
                                                    label: '三星 J315/J316/J3 Plus',
                                                    sku: 'ZYUSSJ315',
                                                    x: 205,
                                                    y: 25,
                                                    width: 383,
                                                    height: 758
                                                },
                                                {
                                                    label: '三星 J317欧版/J3 Pro',
                                                    sku: 'ZYUSSJ317EU',
                                                    x: 225,
                                                    y: 18,
                                                    width: 381,
                                                    height: 761
                                                },
                                                {
                                                    label: '三星 J317美版/J3 Prime',
                                                    sku: 'ZYUSSJ317US',
                                                    x: 212,
                                                    y: 17,
                                                    width: 387,
                                                    height: 765
                                                },
                                                {
                                                    label: '三星 J318美版',
                                                    sku: 'ZYUSSJ318US',
                                                    x: 236,
                                                    y: 32,
                                                    width: 361,
                                                    height: 734
                                                },
                                                {
                                                    label: '三星 J418欧版',
                                                    sku: 'ZYUSSJ418EU',
                                                    x: 207,
                                                    y: 20,
                                                    width: 397,
                                                    height: 760
                                                },
                                                {
                                                    label: '三星 J4 Prime/J4 Plus',
                                                    sku: 'ZYUSSJ4PRIME',
                                                    x: 231,
                                                    y: 24,
                                                    width: 364,
                                                    height: 742
                                                },
                                                {
                                                    label: '三星 J516',
                                                    sku: 'ZYUSSJ516',
                                                    x: 224,
                                                    y: 21,
                                                    width: 364,
                                                    height: 742
                                                },
                                                {
                                                    label: '三星 J517欧版',
                                                    sku: 'ZYUSSJ517EU',
                                                    x: 216,
                                                    y: 21,
                                                    width: 378,
                                                    height: 761
                                                },
                                                {
                                                    label: '三星 J517美版',
                                                    sku: 'ZYUSSJ517US',
                                                    x: 214,
                                                    y: 21,
                                                    width: 381,
                                                    height: 760
                                                },
                                                {
                                                    label: '三星 J618欧版/On6',
                                                    sku: 'ZYUSSJ618EU',
                                                    x: 226,
                                                    y: 10,
                                                    width: 375,
                                                    height: 764
                                                },
                                                {
                                                    label: '三星 J6 Prime/J6 Plus',
                                                    sku: 'ZYUSSJ6PRIME',
                                                    x: 217,
                                                    y: 22,
                                                    width: 373,
                                                    height: 766
                                                },
                                                {
                                                    label: '三星 J716',
                                                    sku: 'ZYUSSJ716',
                                                    x: 222,
                                                    y: 24,
                                                    width: 372,
                                                    height: 758
                                                },
                                                {
                                                    label: '三星 J717欧版',
                                                    sku: 'ZYUSSJ717EU',
                                                    x: 226,
                                                    y: 32,
                                                    width: 370,
                                                    height: 745
                                                },
                                                {
                                                    label: '三星 J717美版',
                                                    sku: 'ZYUSSJ717US',
                                                    x: 222,
                                                    y: 27,
                                                    width: 369,
                                                    height: 754
                                                },
                                                {
                                                    label: '三星 J718美版',
                                                    sku: 'ZYUSSJ718US',
                                                    x: 231,
                                                    y: 25,
                                                    width: 378,
                                                    height: 758
                                                },
                                                {
                                                    label: '三星 J7 Prime2/J7 Prime(2018)',
                                                    sku: 'ZYUSSJ7PRIME2',
                                                    x: 225,
                                                    y: 17,
                                                    width: 375,
                                                    height: 767
                                                },
                                                {
                                                    label: '三星 J818欧版',
                                                    sku: 'ZYUSSJ818EU',
                                                    x: 223,
                                                    y: 26,
                                                    width: 372,
                                                    height: 744
                                                },
                                                {
                                                    label: '三星 M10/A10',
                                                    sku: 'ZYUSSM10',
                                                    x: 229,
                                                    y: 14,
                                                    width: 363,
                                                    height: 765
                                                },
                                                {
                                                    label: '三星 M20',
                                                    sku: 'ZYUSSM20',
                                                    x: 224,
                                                    y: 24,
                                                    width: 369,
                                                    height: 750
                                                },
                                                {
                                                    label: '三星 M30',
                                                    sku: 'ZYUSSM30',
                                                    x: 218,
                                                    y: 19,
                                                    width: 369,
                                                    height: 764
                                                },
                                                {
                                                    label: '三星 Note 8',
                                                    sku: 'ZYUSSN8',
                                                    x: 243,
                                                    y: 23,
                                                    width: 353,
                                                    height: 754
                                                },
                                                {
                                                    label: '三星 Note 9',
                                                    sku: 'ZYUSSN9',
                                                    x: 229,
                                                    y: 23,
                                                    width: 373,
                                                    height: 756
                                                },
                                                {
                                                    label: '三星 S10',
                                                    sku: 'ZYUSSS10',
                                                    x: 236,
                                                    y: 18,
                                                    width: 357,
                                                    height: 764
                                                },
                                                {
                                                    label: '三星 S10 Plus',
                                                    sku: 'ZYUSSS10PLUS',
                                                    x: 236,
                                                    y: 21,
                                                    width: 360,
                                                    height: 755
                                                },
                                                {
                                                    label: '三星 S10e',
                                                    sku: 'ZYUSSS10E',
                                                    x: 210,
                                                    y: 16,
                                                    width: 371,
                                                    height: 767

                                                },
                                                {
                                                    label: '三星 S7',
                                                    sku: 'ZYUSSS7',
                                                    x: 227,
                                                    y: 24,
                                                    width: 369,
                                                    height: 762
                                                },
                                                {
                                                    label: '三星 S7 Edge',
                                                    sku: 'ZYUSSS7EDGE',
                                                    x: 218,
                                                    y: 22,
                                                    width: 357,
                                                    height: 751
                                                },
                                                {
                                                    label: '三星 S8',
                                                    sku: 'ZYUSSS8',
                                                    x: 220,
                                                    y: 20,
                                                    width: 358,
                                                    height: 762
                                                },
                                                {
                                                    label: '三星 S8 Plus',
                                                    sku: 'ZYUSSS8PLUS',
                                                    x: 219,
                                                    y: 11,
                                                    width: 369,
                                                    height: 762
                                                },
                                                {
                                                    label: '三星 S9',
                                                    sku: 'ZYUSSS9',
                                                    x: 230,
                                                    y: 26,
                                                    width: 351,
                                                    height: 742
                                                },
                                                {
                                                    label: '三星 S9 Plus',
                                                    sku: 'ZYUSSS9PLUS',
                                                    x: 237,
                                                    y: 20,
                                                    width: 357,
                                                    height: 752
                                                },
                                                {
                                                    label: '三星 S4',
                                                    sku: 'ZYUSSS4',
                                                    x: 225,
                                                    y: 22,
                                                    width: 380,
                                                    height: 750
                                                },
                                                {
                                                    label: '三星 S5',
                                                    sku: 'ZYUSSS5',
                                                    x: 215,
                                                    y: 29,
                                                    width: 388,
                                                    height: 743
                                                },
                                                {
                                                    label: '三星 S6',
                                                    sku: 'ZYUSSS6',
                                                    x: 211,
                                                    y: 19,
                                                    width: 370,
                                                    height: 763
                                                },
                                                {
                                                    label: '三星 S6 edge PLUS',
                                                    sku: 'ZYUSSS6EP',
                                                    x: 225,
                                                    y: 21,
                                                    width: 385,
                                                    height: 757
                                                },
                                                {
                                                    label: '三星 S6 edge',
                                                    sku: 'ZYUSSS6E',
                                                    x: 228,
                                                    y: 30,
                                                    width: 372,
                                                    height: 752
                                                },
                                                {
                                                    label: '三星 A3(2015)',
                                                    sku: 'ZYUSSA3',
                                                    x: 205,
                                                    y: 25,
                                                    width: 378,
                                                    height: 749
                                                },
                                                {
                                                    label: '三星 A3(2016)',
                                                    sku: 'ZYUSSA310',
                                                    x: 226,
                                                    y: 27,
                                                    width: 369,
                                                    height: 759
                                                },
                                                {
                                                    label: '三星 A3(2017)',
                                                    sku: 'ZYUSSA317',
                                                    x: 221,
                                                    y: 26,
                                                    width: 378,
                                                    height: 754
                                                },
                                                {
                                                    label: '三星 A5(2015)',
                                                    sku: 'ZYUSSA5',
                                                    x: 213,
                                                    y: 23,
                                                    width: 385,
                                                    height: 754
                                                },
                                                {
                                                    label: '三星 A5(2016)',
                                                    sku: 'ZYUSSA510',
                                                    x: 215,
                                                    y: 34,
                                                    width: 377,
                                                    height: 740
                                                },
                                                {
                                                    label: '三星 A5(2017)',
                                                    sku: 'ZYUSSA517',
                                                    x: 214,
                                                    y: 20,
                                                    width: 387,
                                                    height: 761
                                                },
                                                {
                                                    label: '三星 A7',
                                                    sku: 'ZYUSSA7',
                                                    x: 216,
                                                    y: 23,
                                                    width: 388,
                                                    height: 762
                                                },
                                                {
                                                    label: '三星 A8',
                                                    sku: 'ZYUSSA8',
                                                    x: 218,
                                                    y: 26,
                                                    width: 383,
                                                    height: 767
                                                },
                                                {
                                                    label: '三星 A9/A9pro',
                                                    sku: 'ZYUSSA9',
                                                    x: 226,
                                                    y: 27,
                                                    width: 367,
                                                    height: 751
                                                },
                                                {
                                                    label: '三星 J1',
                                                    sku: 'ZYUSSJ1',
                                                    x: 269,
                                                    y: 20,
                                                    width: 395,
                                                    height: 753
                                                },
                                                {
                                                    label: '三星 J2',
                                                    sku: 'ZYUSSJ2',
                                                    x: 216,
                                                    y: 19,
                                                    width: 392,
                                                    height: 751
                                                },
                                                {
                                                    label: '三星 J2 Prime/Grand Prime Plus',
                                                    sku: 'ZYUSSJ2PRIME',
                                                    x: 231,
                                                    y: 23,
                                                    width: 384,
                                                    height: 763
                                                },
                                                {
                                                    label: '三星 J5(2015)',
                                                    sku: 'ZYUSSJ5',
                                                    x: 203,
                                                    y: 24,
                                                    width: 393,
                                                    height: 757
                                                },
                                                {
                                                    label: '三星 J7/J7NEO',
                                                    sku: 'ZYUSSJ7',
                                                    x: 206,
                                                    y: 20,
                                                    width: 408,
                                                    height: 766
                                                },
                                                {
                                                    label: '三星 Note3',
                                                    sku: 'ZYUSSN3',
                                                    x: 218,
                                                    y: 30,
                                                    width: 384,
                                                    height: 746
                                                },
                                                {
                                                    label: '三星 Note4',
                                                    sku: 'ZYUSSN4',
                                                    x: 224,
                                                    y: 34,
                                                    width: 390,
                                                    height: 739
                                                },
                                                {
                                                    label: '三星 Note5',
                                                    sku: 'ZYUSSN5',
                                                    x: 224,
                                                    y: 31,
                                                    width: 366,
                                                    height: 747
                                                },
                                                {
                                                    label: '三星 J7 prime',
                                                    sku: 'ZYUSSJ7PRIME',
                                                    x: 216,
                                                    y: 20,
                                                    width: 385,
                                                    height: 765
                                                },
                                                {
                                                    label: '三星 A70',
                                                    sku: 'ZYUSSA70',
                                                    x: 225,
                                                    y: 20,
                                                    width: 365,
                                                    height: 765
                                                },
                                                {
                                                    label: '三星 M40/A60',
                                                    sku: 'ZYUSSM40',
                                                    x: 227,
                                                    y: 23,
                                                    width: 362,
                                                    height: 756
                                                },
                                                {
                                                    label: '三星 A80/A90',
                                                    sku: 'ZYUSSA80',
                                                    x: 241,
                                                    y: 35,
                                                    width: 348,
                                                    height: 735
                                                },
                                                {
                                                    label: '三星 Note 10',
                                                    sku: 'ZYUSSN10',
                                                    x: 231,
                                                    y: 20,
                                                    width: 359,
                                                    height: 752
                                                },
                                                {
                                                    label: '三星 Note 10 Plus',
                                                    sku: 'ZYUSSN10PLUS',
                                                    x: 230,
                                                    y: 28,
                                                    width: 357,
                                                    height: 749
                                                },
                                                {
                                                    label: '三星 A20E',
                                                    sku: 'ZYUSSA20E',
                                                    x: 222,
                                                    y: 21,
                                                    width: 365,
                                                    height: 766
                                                },
                                                {
                                                    label: '三星 M30s',
                                                    sku: 'ZYUSSM30S',
                                                    x: 219,
                                                    y: 23,
                                                    width: 362,
                                                    height: 756
                                                },
                                                {
                                                    label: '三星 S20',
                                                    sku: 'ZYUSSS20',
                                                    x: 219,
                                                    y: 18,
                                                    width: 357,
                                                    height: 759
                                                },
                                                {
                                                    label: '三星 S20+',
                                                    sku: 'ZYUSSS20PLUS',
                                                    x: 227,
                                                    y: 27,
                                                    width: 350,
                                                    height: 750
                                                },
                                                {
                                                    label: '三星 S20Ultra',
                                                    sku: 'ZYUSSS20ULTRA',
                                                    x: 219,
                                                    y: 18,
                                                    width: 351,
                                                    height: 757
                                                },
                                                {
                                                    label: '三星 j5',
                                                    sku: 'ZYUSSA51',
                                                    x: 218,
                                                    y: 25,
                                                    width: 372,
                                                    height: 726
                                                },
                                                {
                                                    label: '三星 a5 10（2016）',
                                                    sku: 'ZSCBKSSA510',
                                                    x: 225,
                                                    y: 37,
                                                    width: 366,
                                                    height: 731
                                                },
                                                {
                                                    label: '三星 j5 2017 美版',
                                                    sku: 'ZSCBKSSJ517EU',
                                                    x: 219,
                                                    y: 37,
                                                    width: 365,
                                                    height: 733
                                                },
                                                {
                                                    label: '三星 a3 2017',
                                                    sku: 'ZSCBKSSA317',
                                                    x: 218,
                                                    y: 27,
                                                    width: 369,
                                                    height: 749
                                                },
                                                {
                                                    label: '三星 j5 2017 美版',
                                                    sku: 'ZSCBKSSJ517US',
                                                    x: 219,
                                                    y: 37,
                                                    width: 365,
                                                    height: 733
                                                },
                                                {
                                                    label: '三星 a3 2017',
                                                    sku: 'ZSCBKSSA317',
                                                    x: 218,
                                                    y: 27,
                                                    width: 354,
                                                    height: 747
                                                },
                                                {
                                                    label: '三星 a7 2017',
                                                    sku: 'ZSCBKSSA717',
                                                    x: 217,
                                                    y: 32,
                                                    width: 365,
                                                    height: 736
                                                },
                                                {
                                                    label: '三星 J1 2016',
                                                    sku: 'ZSCBKSSJ110',
                                                    x: 215,
                                                    y: 47,
                                                    width: 376,
                                                    height: 706
                                                },
                                                {
                                                    label: '三星 J3 17 美版',
                                                    sku: 'ZSCBKSSJ3PRIME',
                                                    x: 216,
                                                    y: 32,
                                                    width: 365,
                                                    height: 741
                                                },
                                                {
                                                    label: '三星 J3 17 欧版',
                                                    sku: 'ZSCBKSSJ3PRO',
                                                    x: 218,
                                                    y: 27,
                                                    width: 373,
                                                    height: 745
                                                },
                                                {
                                                    label: '三星 J3',
                                                    sku: 'ZSCBKSSJ3',
                                                    x: 218,
                                                    y: 38,
                                                    width: 369,
                                                    height: 724
                                                },
                                                {
                                                    label: '三星 J5 10 (2016)',
                                                    sku: 'ZSCBKSSJ510',
                                                    x: 214,
                                                    y: 28,
                                                    width: 367,
                                                    height: 745
                                                },
                                                {
                                                    label: '三星 J5 2017 欧版',
                                                    sku: 'ZSCBKSSJ517EU',
                                                    x: 220,
                                                    y: 24,
                                                    width: 358,
                                                    height: 752
                                                },
                                                {
                                                    label: '三星 J7 2017 美版',
                                                    sku: 'ZSCBKSSJ517US',
                                                    x: 231,
                                                    y: 34,
                                                    width: 337,
                                                    height: 729
                                                },
                                                {
                                                    label: '三星 J7 2017 欧版',
                                                    sku: 'ZSCBKSSJ717EU',
                                                    x: 223,
                                                    y: 35,
                                                    width: 364,
                                                    height: 731
                                                },
                                                {
                                                    label: '三星 J7 plus',
                                                    sku: 'ZSCBKSSJ7PLUS',
                                                    x: 217,
                                                    y: 20,
                                                    width: 372,
                                                    height: 759
                                                },
                                                {
                                                    label: '三星 J7 prime 2',
                                                    sku: 'ZSCBKSSJ7PRIME',
                                                    x: 213,
                                                    y: 28,
                                                    width: 375,
                                                    height: 750
                                                },
                                                {
                                                    label: '三星 J7',
                                                    sku: 'ZSCBKSSJ7',
                                                    x: 209,
                                                    y: 30,
                                                    width: 388,
                                                    height: 744
                                                },
                                                {
                                                    label: '三星 J8 2018',
                                                    sku: 'ZSCBKSSJ818',
                                                    x: 225,
                                                    y: 18,
                                                    width: 349,
                                                    height: 763
                                                },
                                                {
                                                    label: '三星 M20',
                                                    sku: 'ZSCBKSSM20',
                                                    x: 232,
                                                    y: 32,
                                                    width: 334,
                                                    height: 733
                                                },
                                                {
                                                    label: '三星 M30',
                                                    sku: 'ZSCBKSSM30',
                                                    x: 231,
                                                    y: 28,
                                                    width: 340,
                                                    height: 740
                                                },
                                                {
                                                    label: '三星 note 4',
                                                    sku: 'ZSCBKSSN4',
                                                    x: 215,
                                                    y: 33,
                                                    width: 376,
                                                    height: 730
                                                },
                                                {
                                                    label: '三星 note 5',
                                                    sku: 'ZSCBKSSN5',
                                                    x: 218,
                                                    y: 30,
                                                    width: 366,
                                                    height: 742
                                                },
                                                {
                                                    label: '三星 A30/A20',
                                                    sku: 'ZYUSSA30',
                                                    x: 243,
                                                    y: 22,
                                                    width: 356,
                                                    height: 757
                                                },
                                                {
                                                    label: '三星 A40',
                                                    sku: 'ZYUSSA40',
                                                    x: 225,
                                                    y: 14,
                                                    width: 359,
                                                    height: 768
                                                },
                                                {
                                                    label: '三星 A50',
                                                    sku: 'ZYUSSA50',
                                                    x: 232,
                                                    y: 16,
                                                    width: 363,
                                                    height: 768
                                                },
                                            ]
                                        },
                                        {
                                            label: "糖果壳",
                                            children: [
                                                {
                                                    label: '三星 A30/A20',
                                                    x: 217,
                                                    y: 22,
                                                    width: 366,
                                                    height: 742,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSA30'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSA30'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSA30'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSA30'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSA30'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSA30'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSA30'
                                                        },
                                                    ]
                                                }, {
                                                    label: '三星 A40',
                                                    x: 217,
                                                    y: 22,
                                                    width: 366,
                                                    height: 742,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSA40'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSA40'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSA40'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSA40'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSA40'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSA40'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSA40'
                                                        },
                                                    ]
                                                }, {
                                                    label: '三星 A50',
                                                    x: 217,
                                                    y: 22,
                                                    width: 366,
                                                    height: 742,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSA50'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSA50'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSA50'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSA50'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSA50'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSA50'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSA50'
                                                        },
                                                    ]
                                                }, {
                                                    label: '三星 A5 (2017)',
                                                    x: 214,
                                                    y: 35,
                                                    width: 366,
                                                    height: 720,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSA517'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSA517'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSA517'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSA517'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSA517'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSA517'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSA517'
                                                        },
                                                    ]
                                                }, {
                                                    label: '三星 A6 (2018)',
                                                    x: 216,
                                                    y: 22,
                                                    width: 366,
                                                    height: 742,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSA618'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSA618'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSA618'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSA618'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSA618'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSA618'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSA618'
                                                        },
                                                    ]
                                                }, {
                                                    label: '三星 A70',
                                                    x: 225,
                                                    y: 22,
                                                    width: 366,
                                                    height: 742,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSA70'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSA70'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSA70'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSA70'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSA70'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSA70'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSA70'
                                                        },
                                                    ]
                                                }, {
                                                    label: '三星 A7 (2018)',
                                                    x: 214,
                                                    y: 21,
                                                    width: 352,
                                                    height: 742,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSA718'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSA718'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSA718'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSA718'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSA718'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSA718'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSA718'
                                                        },
                                                    ]
                                                }, {
                                                    label: '三星 A8 (2018)/A5 (2018)',
                                                    x: 216,
                                                    y: 22,
                                                    width: 366,
                                                    height: 742,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSA818'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSA818'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSA818'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSA818'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSA818'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSA818'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSA818'
                                                        },
                                                    ]
                                                }, {
                                                    label: '三星 J2 Prime',
                                                    x: 203,
                                                    y: 22,
                                                    width: 388,
                                                    height: 742,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSJ2PRIME'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSJ2PRIME'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSJ2PRIME'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSJ2PRIME'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSJ2PRIME'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSJ2PRIME'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSJ2PRIME'
                                                        },
                                                    ]
                                                }, {
                                                    label: '三星 J3 Pro/J317 (EU Version)',
                                                    x: 213,
                                                    y: 22,
                                                    width: 366,
                                                    height: 742,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSJ3PRO'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSJ3PRO'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSJ3PRO'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSJ3PRO'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSJ3PRO'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSJ3PRO'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSJ3PRO'
                                                        },
                                                    ]
                                                }, {
                                                    label: '三星 J3 (2016)',
                                                    x: 219,
                                                    y: 49,
                                                    width: 357,
                                                    height: 700,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSJ310'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSJ310'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSJ310'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSJ310'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSJ310'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSJ310'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSJ310'
                                                        },
                                                    ]
                                                }, {
                                                    label: '三星 (2018) (EU Version)/On6',
                                                    x: 218,
                                                    y: 24,
                                                    width: 362,
                                                    height: 738,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSJ618'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSJ618'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSJ618'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSJ618'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSJ618'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSJ618'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSJ618'
                                                        },
                                                    ]
                                                }, {
                                                    label: '三星 J7 (2016)',
                                                    x: 214,
                                                    y: 22,
                                                    width: 366,
                                                    height: 742,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSJ710'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSJ710'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSJ710'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSJ710'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSJ710'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSJ710'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSJ710'
                                                        },
                                                    ]
                                                }, {
                                                    label: '三星 M10/A10',
                                                    x: 229,
                                                    y: 55,
                                                    width: 339,
                                                    height: 690,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSM10'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSM10'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSM10'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSM10'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSM10'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSM10'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSM10'
                                                        },
                                                    ]
                                                }, {
                                                    label: '三星 Note 10',
                                                    x: 231,
                                                    y: 49,
                                                    width: 334,
                                                    height: 696,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSN10'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSN10'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSN10'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSN10'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSN10'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSN10'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSN10'
                                                        },
                                                    ]
                                                }, {
                                                    label: '三星 Note 10 Plus',
                                                    x: 233,
                                                    y: 49,
                                                    width: 333,
                                                    height: 700,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSN10PLUS'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSN10PLUS'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSN10PLUS'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSN10PLUS'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSN10PLUS'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSN10PLUS'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSN10PLUS'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: '三星 Note 8',
                                                    x: 230,
                                                    y: 49,
                                                    width: 334,
                                                    height: 700,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSN8'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSN8'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSN8'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSN8'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSN8'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSN8'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSN8'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: '三星 Note 9',
                                                    x: 231,
                                                    y: 49,
                                                    width: 333,
                                                    height: 704,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSN9'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSN9'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSN9'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSN9'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSN9'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSN9'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSN9'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: '三星 S6',
                                                    x: 219,
                                                    y: 36,
                                                    width: 359,
                                                    height: 728,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSS6'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSS6'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSS6'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSS6'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSS6'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSS6'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSS6'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: '三星 S6 Edge',
                                                    x: 212,
                                                    y: 31,
                                                    width: 366,
                                                    height: 742,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSS6EDGE'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSS6EDGE'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSS6EDGE'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSS6EDGE'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSS6EDGE'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSS6EDGE'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSS6EDGE'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: '三星 S7',
                                                    x: 218,
                                                    y: 30,
                                                    width: 366,
                                                    height: 742,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSS7'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSS7'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSS7'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSS7'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSS7'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSS7'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSS7'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: '三星 S7 Edge',
                                                    x: 216,
                                                    y: 22,
                                                    width: 348,
                                                    height: 742,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSS7EDGE'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSS7EDGE'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSS7EDGE'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSS7EDGE'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSS7EDGE'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSS7EDGE'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSS7EDGE'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: '三星 S8',
                                                    x: 224,
                                                    y: 22,
                                                    width: 366,
                                                    height: 742,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSS8'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSS8'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSS8'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSS8'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSS8'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSS8'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSS8'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: '三星 S8 Plus',
                                                    x: 224,
                                                    y: 22,
                                                    width: 351,
                                                    height: 742,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSS8PLUS'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSS8PLUS'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSS8PLUS'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSS8PLUS'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSS8PLUS'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSS8PLUS'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSS8PLUS'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: '三星 S9',
                                                    x: 220,
                                                    y: 22,
                                                    width: 366,
                                                    height: 742,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSS9'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSS9'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSS9'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSS9'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSS9'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSS9'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSS9'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: '三星 S9 Plus',
                                                    x: 212,
                                                    y: 31,
                                                    width: 349,
                                                    height: 742,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSS9PLUS'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSS9PLUS'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSS9PLUS'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSS9PLUS'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSS9PLUS'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSS9PLUS'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSS9PLUS'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: '三星 S10',
                                                    x: 214,
                                                    y: 22,
                                                    width: 366,
                                                    height: 742,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSS10'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSS10'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSS10'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSS10'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSS10'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSS10'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSS10'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: '三星 Galaxy S10 Plus',
                                                    x: 218,
                                                    y: 30,
                                                    width: 366,
                                                    height: 742,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSS10PLUS'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSS10PLUS'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSS10PLUS'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSS10PLUS'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSS10PLUS'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSS10PLUS'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSS10PLUS'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: '三星 S10e',
                                                    x: 234,
                                                    y: 54,
                                                    width: 366,
                                                    height: 742,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSS10E'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSS10E'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSS10E'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCRDSSS10E'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSS10E'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSS10E'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSS10E'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: '三星 A80',
                                                    x: 241,
                                                    y: 63,
                                                    width: 319,
                                                    height: 674,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSA80'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCYLSSA80'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSA80'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSA80'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEKSSA80'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSA80'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSA80'
                                                        },
                                                    ]
                                                }, {
                                                    label: '三星 A20E',
                                                    x: 222,
                                                    y: 48,
                                                    width: 357,
                                                    height: 706,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSA20E'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSA20E'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSA20E'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNKSSA20E'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEKSSA20E'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSA20E'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSA20E'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: '三星 M30s',
                                                    x: 240,
                                                    y: 65,
                                                    width: 320,
                                                    height: 671,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSM30S'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSM30S'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSM30S'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSM30S'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSM30S'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSM30S'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSM30S'
                                                        },
                                                    ]
                                                }, {
                                                    label: '三星 S20',
                                                    x: 230,
                                                    y: 28,
                                                    width: 350,
                                                    height: 756,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSS20'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSS20'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSS20'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSS20'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSS20'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSS20'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSS20'
                                                        },
                                                    ]
                                                }, {
                                                    label: '三星 S20 Plus',
                                                    x: 223,
                                                    y: 22,
                                                    width: 354,
                                                    height: 750,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSS20PLUS'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSS20PLUS'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSS20PLUS'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSS20PLUS'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSS20PLUS'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSS20PLUS'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSS20PLUS'
                                                        },
                                                    ]
                                                }, {
                                                    label: '三星 S20 Ultra',
                                                    x: 225,
                                                    y: 22,
                                                    width: 350,
                                                    height: 756,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSS20ULTRA'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSS20ULTRA'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCLTPKSSS20ULTRA'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSS20ULTRA'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSS20ULTRA'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSS20ULTRA'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSS20ULTRA'
                                                        },
                                                    ]
                                                }, {
                                                    label: '三星A51',
                                                    x: 232,
                                                    y: 63,
                                                    width: 315,
                                                    height: 674,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSA51'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSA51'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSA51'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSA51'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSA51'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSA51'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSA51'
                                                        },
                                                    ]
                                                }, {
                                                    label: '三星A71',
                                                    x: 243,
                                                    y: 63,
                                                    width: 315,
                                                    height: 674,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLSSA71'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKSSA71'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDSSA71'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNSSA71'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWESSA71'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRSSA71'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKSSA71'
                                                        },
                                                    ]
                                                }
                                            ]
                                        },
                                    ]
                                },
                                {
                                    label: '小米',
                                    children: [
                                        {
                                            label: "透明壳",
                                            children: [
                                                {
                                                    label: '小米 8 Lite',
                                                    sku: 'ZYUXMMI8LITE',
                                                    x: 213,
                                                    y: 26,
                                                    width: 382,
                                                    height: 758
                                                },
                                                {
                                                    label: '小米 9',
                                                    sku: 'ZYUXMMI9',
                                                    x: 231,
                                                    y: 27,
                                                    width: 372,
                                                    height: 750
                                                },
                                                {
                                                    label: '小米 9 SE',
                                                    sku: 'ZYUXMMI9SE',
                                                    x: 222,
                                                    y: 26,
                                                    width: 369,
                                                    height: 756
                                                },
                                                {
                                                    label: '小米 A2/小米 6X',
                                                    sku: 'ZYUXMA2',
                                                    x: 214,
                                                    y: 20,
                                                    width: 382,
                                                    height: 762
                                                }, {
                                                    label: '小米 A2 Lite/红米 6 pro',
                                                    sku: 'ZYUXMA2LITE',
                                                    x: 216,
                                                    y: 27,
                                                    width: 377,
                                                    height: 752
                                                }, {
                                                    label: '小米 F1',
                                                    sku: 'ZYUXMF1',
                                                    x: 214,
                                                    y: 20,
                                                    width: 382,
                                                    height: 762
                                                }, {
                                                    label: '小米红米 6',
                                                    sku: 'ZYUXMRM6',
                                                    x: 223,
                                                    y: 22,
                                                    width: 371,
                                                    height: 756
                                                }, {
                                                    label: '小米红米 6A',
                                                    sku: 'ZYUXMRM6A',
                                                    x: 214,
                                                    y: 27,
                                                    width: 376,
                                                    height: 754
                                                }, {
                                                    label: '小米红米 Note 7/Note 7 Pro',
                                                    sku: 'ZYUXMRMN7',
                                                    x: 210,
                                                    y: 19,
                                                    width: 384,
                                                    height: 767
                                                }, {
                                                    label: '小米红米 Note 4',
                                                    sku: 'ZYUXMRMN4',
                                                    x: 215,
                                                    y: 20,
                                                    width: 395,
                                                    height: 761
                                                }, {
                                                    label: '小米红米 5',
                                                    sku: 'ZYUXMRM5',
                                                    x: 220,
                                                    y: 21,
                                                    width: 376,
                                                    height: 762
                                                }, {
                                                    label: '小米红米 7',
                                                    sku: 'ZYUXMRM7',
                                                    x: 217,
                                                    y: 26,
                                                    width: 372,
                                                    height: 751
                                                }, {
                                                    label: '小米红米 Y3',
                                                    sku: 'ZYUXMRM7',
                                                    x: 229,
                                                    y: 28,
                                                    width: 367,
                                                    height: 745
                                                }, {
                                                    label: '小米红米 Note 5 Pro',
                                                    sku: 'ZYUXMRMN5PRO',
                                                    x: 214,
                                                    y: 27,
                                                    width: 372,
                                                    height: 752
                                                }, {
                                                    label: '小米红米 Y2/S2',
                                                    sku: 'ZYUXMRMY2',
                                                    x: 213,
                                                    y: 26,
                                                    width: 376,
                                                    height: 757
                                                },
                                                {
                                                    label: '小米红米 Note 8 Pro',
                                                    sku: 'ZYUXMRMN8PRO',
                                                    x: 222,
                                                    y: 22,
                                                    width: 373,
                                                    height: 763
                                                },
                                                {
                                                    label: '小米红米 Note 8',
                                                    sku: 'ZYUXMRMN8',
                                                    x: 225,
                                                    y: 26,
                                                    width: 364,
                                                    height: 754
                                                },
                                                {
                                                    label: '小米 9T/9T Pro/K20/K20 PRO',
                                                    sku: 'ZYUXM9T',
                                                    x: 216,
                                                    y: 20,
                                                    width: 374,
                                                    height: 760,

                                                },
                                                {
                                                    label: '小米红米 7a',
                                                    sku: 'ZYUXMRM7A',
                                                    x: 215,
                                                    y: 26,
                                                    width: 372,
                                                    height: 751
                                                },
                                                {
                                                    label: '小米 10',
                                                    sku: 'ZYUXM10',
                                                    x: 226,
                                                    y: 22,
                                                    width: 356,
                                                    height: 753
                                                },
                                                {
                                                    label: '小米 10 Pro',
                                                    sku: 'ZYUXM10PRO',
                                                    x: 222,
                                                    y: 19,
                                                    width: 357,
                                                    height: 768
                                                },
                                                {
                                                    label: '小米红米 8/8A',
                                                    sku: 'ZYUXMRM8',
                                                    x: 200,
                                                    y: 21,
                                                    width: 377,
                                                    height: 760
                                                },
                                                {
                                                    label: '小米红米 Note 8T',
                                                    sku: 'ZYUXMRMN8T',
                                                    x: 225,
                                                    y: 25,
                                                    width: 373,
                                                    height: 758
                                                },
                                                {
                                                    label: '小米红米 K30/POCO X2',
                                                    sku: 'ZYUXMRMK30',
                                                    x: 230,
                                                    y: 18,
                                                    width: 365,
                                                    height: 767
                                                },
                                                {
                                                    label: '小米红米 K30 PRO',
                                                    sku: 'ZYUXMRMK30PRO',
                                                    x: 223,
                                                    y: 22,
                                                    width: 360,
                                                    height: 759
                                                }, {
                                                    label: '小米 9',
                                                    sku: 'ZSCBKXMMI9',
                                                    x: 227,
                                                    y: 31,
                                                    width: 348,
                                                    height: 737
                                                }, {
                                                    label: '红米 note 6',
                                                    sku: 'ZSCBKXMRMN6',
                                                    x: 224,
                                                    y: 28,
                                                    width: 360,
                                                    height: 747
                                                }, {
                                                    label: '小米 8 lite',
                                                    sku: 'ZSCBKXMMI8LITE',
                                                    x: 222,
                                                    y: 28,
                                                    width: 359,
                                                    height: 745
                                                }, {
                                                    label: '小米 A2',
                                                    sku: 'ZYUXMRMK30PRO',
                                                    x: 220,
                                                    y: 31,
                                                    width: 352,
                                                    height: 741
                                                }, {
                                                    label: '小米 Mi 5x',
                                                    sku: 'ZSCBKXMMI5X',
                                                    x: 224,
                                                    y: 47,
                                                    width: 350,
                                                    height: 709
                                                }, {
                                                    label: '小米 Mi 6',
                                                    sku: 'ZSCBKXMMI6X',
                                                    x: 225,
                                                    y: 32,
                                                    width: 355,
                                                    height: 735
                                                }, {
                                                    label: '小米 Mi 8',
                                                    sku: 'ZSCBKXMMI8',
                                                    x: 228,
                                                    y: 37,
                                                    width: 349,
                                                    height: 724
                                                }, {
                                                    label: '小米 红米 4a',
                                                    sku: 'ZSCBKXMRM4A',
                                                    x: 220,
                                                    y: 31,
                                                    width: 362,
                                                    height: 738
                                                }, {
                                                    label: '小米 红米 note 4',
                                                    sku: 'ZSCBKXMRMN4',
                                                    x: 219,
                                                    y: 35,
                                                    width: 364,
                                                    height: 737
                                                }, {
                                                    label: '小米 红米 note 5a',
                                                    sku: 'ZSCBKXMRMN5A',
                                                    x: 225,
                                                    y: 36,
                                                    width: 353,
                                                    height: 724
                                                }, {
                                                    label: '小米 红米 5a',
                                                    sku: 'ZSCBKXMRM5A',
                                                    x: 225,
                                                    y: 38,
                                                    width: 357,
                                                    height: 723
                                                }, {
                                                    label: '小米 9 se',
                                                    sku: 'ZSCBKXMMI9SE',
                                                    x: 225,
                                                    y: 21,
                                                    width: 357,
                                                    height: 756
                                                },
                                            ]
                                        },
                                        {
                                            label: "糖果壳",
                                            children: [
                                                {
                                                    label: '小米红米 5',
                                                    x: 221,
                                                    y: 31,
                                                    width: 358,
                                                    height: 737,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLXMRM5'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKXMRM5'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDXMRM5'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNXMRM5'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEXMRM5'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRXMRM5'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKXMRM5'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: '小米红米 5 Plus',
                                                    x: 220,
                                                    y: 31,
                                                    width: 358,
                                                    height: 736,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLXMRM5PLUS'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKXMRM5PLUS'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDXMRM5PLUS'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNXMRM5PLUS'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEXMRM5PLUS'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRXMRM5PLUS'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKXMRM5PLUS'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: '小米 A2 Lite/红米 6 Pro',
                                                    x: 230,
                                                    y: 28,
                                                    width: 368,
                                                    height: 756,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLXMA2LITE'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKXMA2LITE'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDXMA2LITE'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNXMA2LITE'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEXMA2LITE'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRXMA2LITE'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKXMA2LITE'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: '小米红米 6',
                                                    x: 221,
                                                    y: 38,
                                                    width: 358,
                                                    height: 725,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLXMRM6'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKXMRM6'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDXMRM6'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNXMRM6'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEXMRM6'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRXMRM6'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKXMRM6'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'Xiaomi Redmi 6A',
                                                    x: 216,
                                                    y: 22,
                                                    width: 368,
                                                    height: 756,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLXMRM6A'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKXMRM6A'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDXMRM6A'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNXMRM6A'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEXMRM6A'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRXMRM6A'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKXMRM6A'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: '小米红米 Note 7/Note 7 Pro',
                                                    x: 214,
                                                    y: 27,
                                                    width: 367,
                                                    height: 727,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLXMRMN7'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKXMRMN7'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDXMRMN7'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNXMRMN7'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEXMRMN7'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRXMRMN7'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKXMRMN7'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: '小米红米 K20/K20 Pro/9T/9T pro',
                                                    x: 216,
                                                    y: 22,
                                                    width: 325,
                                                    height: 678,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLXMRMK20'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKXMRMK20'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDXMRMK20'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNXMRMK20'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEXMRMK20'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRXMRMK20'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKXMRMK20'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: '小米9T/9T Pro 通用红米K20/K20 Pro',
                                                    x: 221,
                                                    y: 38,
                                                    width: 323,
                                                    height: 673,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLXMRMK20'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKXMRMK20'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDXMRMK20'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNXMRMK20'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEXMRMK20'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRXMRMK20'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKXMRMK20'
                                                        },
                                                    ]
                                                }, {
                                                    label: '小米 A3/ 小米 CC9e/9 LITE',
                                                    x: 247,
                                                    y: 71,
                                                    width: 307,
                                                    height: 659,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLXMA3'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKXMA3'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDXMA3'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNXMA3'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEXMA3'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRXMA3'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKXMA3'
                                                        },
                                                    ]
                                                }, {
                                                    label: '小米红米 Note 8 Pro',
                                                    x: 222,
                                                    y: 47,
                                                    width: 357,
                                                    height: 706,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLXMRMN8PRO'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKXMRMN8PRO'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDXMRMN8PRO'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNXMRMN8PRO'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEXMRMN8PRO'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRXMRMN8PRO'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKXMRMN8PRO'
                                                        },
                                                    ]
                                                }, {
                                                    label: '小米红米 Note 8',
                                                    x: 222,
                                                    y: 47,
                                                    width: 357,
                                                    height: 706,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLXMRMN8'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKXMRMN8'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDXMRMN8'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNXMRMN8'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEXMRMN8'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRXMRMN8'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKXMRMN8'
                                                        },
                                                    ]
                                                }, {
                                                    label: '小米Note 10/Note 10 Pro(CC9 Pro)',
                                                    x: 244,
                                                    y: 71,
                                                    width: 313,
                                                    height: 659,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLXMN10'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCYLXMN10'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDXMN10'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNXMN10'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCGNXMN10'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRXMN10'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKXMN10'
                                                        },
                                                    ]
                                                }, {
                                                    label: '小米红米 8',
                                                    x: 222,
                                                    y: 47,
                                                    width: 346,
                                                    height: 706,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLXMRM8'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKXMRM8'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDXMRM8'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNXMRM8'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEXMRM8'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRXMRM8'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKXMRM8'
                                                        },
                                                    ]
                                                }, {
                                                    label: '小米红米 8A',
                                                    x: 218,
                                                    y: 41,
                                                    width: 365,
                                                    height: 709,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLXMRM8A'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKXMRM8A'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCLTPKXMRM8A'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNXMRM8A'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEXMRM8A'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRXMRM8A'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKXMRM8A'
                                                        },
                                                    ]
                                                }, {
                                                    label: '小米红米 Note 8T',
                                                    x: 221,
                                                    y: 47,
                                                    width: 358,
                                                    height: 706,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLXMRMN8T'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKXMRMN8T'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDXMRMN8T'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNXMRMN8T'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEXMRMN8T'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRXMRMN8T'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKXMRMN8T'
                                                        },
                                                    ]
                                                }, {
                                                    label: '小米红米 7A',
                                                    x: 203,
                                                    y: 22,
                                                    width: 357,
                                                    height: 705,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLXMRM7A'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKXMRM7A'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDXMRM7A'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNXMRM7A'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEXMRM7A'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRXMRM7A'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKXMRM7A'
                                                        },
                                                    ]
                                                }, {
                                                    label: '小米红米 7',
                                                    x: 221,
                                                    y: 29,
                                                    width: 358,
                                                    height: 741,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLXMRM7'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKXMRM7'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDXMRM7'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNXMRM7'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEXMRM7'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRXMRM7'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKXMRM7'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: '小米10',
                                                    x: 243,
                                                    y: 62,
                                                    width: 315,
                                                    height: 673,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLXM10'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKXM10'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDXM10'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNXM10'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEXM10'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRXM10'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKXM10'
                                                        },
                                                    ]
                                                }, {
                                                    label: '小米10 Pro',
                                                    x: 189,
                                                    y: 1,
                                                    width: 317,
                                                    height: 674,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLXM10PRO'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKXM10PRO'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDXM10PRO'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCRDXM10PRO'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEXM10PRO'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRXM10PRO'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKXM10PRO'
                                                        },
                                                    ]
                                                }, {
                                                    label: '小米红米 K30',
                                                    x: 222,
                                                    y: 47,
                                                    width: 357,
                                                    height: 706,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLXMRMK30'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKXMRMK30'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDXMRMK30'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNXMRMK30'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEXMRMK30'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRXMRMK30'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKXMRMK30'
                                                        },
                                                    ]
                                                }, {
                                                    label: '小米红米 K30 PRO',
                                                    x: 222,
                                                    y: 47,
                                                    width: 357,
                                                    height: 706,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLXMRMK30PRO'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKXMRMK30PRO'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDXMRMK30PRO'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNXMRMK30PRO'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEXMRMK30PRO'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRXMRMK30PRO'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKXMRMK30PRO'
                                                        },
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    label: "一加",
                                    children: [
                                        {
                                            label: "糖果壳",
                                            children: [
                                                {
                                                    label: 'Oneplus 6T',
                                                    x: 215,
                                                    y: 22,
                                                    width: 371,
                                                    height: 756,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLONEPLUS6T'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKONEPLUS6T'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDONEPLUS6T'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNONEPLUS6T'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEONEPLUS6T'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRONEPLUS6T'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKONEPLUS6T'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'Oneplus 7',
                                                    x: 215,
                                                    y: 22,
                                                    width: 371,
                                                    height: 756,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLONEPLUS7'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKONEPLUS7'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDONEPLUS7'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNONEPLUS7'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEONEPLUS7'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRONEPLUS7'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKONEPLUS7'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'Oneplus 7 Pro',
                                                    x: 228,
                                                    y: 31,
                                                    width: 371,
                                                    height: 756,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLONEPLUS7PRO'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKONEPLUS7PRO'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDONEPLUS7PRO'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNONEPLUS7PRO'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEONEPLUS7PRO'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRONEPLUS7PRO'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKONEPLUS7PRO'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'Oneplus 7T',
                                                    x: 227,
                                                    y: 41,
                                                    width: 339,
                                                    height: 718,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLONEPLUS7T'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKONEPLUS7T'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDONEPLUS7T'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNONEPLUS7T'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEONEPLUS7T'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRONEPLUS7T'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKONEPLUS7T'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'Oneplus 7T Pro',
                                                    x: 220,
                                                    y: 27,
                                                    width: 355,
                                                    height: 739,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLONEPLUS7TPRO'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKONEPLUS7TPRO'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCLTPKONEPLUS7TPRO'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNONEPLUS7TPRO'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEONEPLUS7TPRO'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRONEPLUS7TPRO'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKONEPLUS7TPRO'
                                                        },
                                                    ]
                                                },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    label: 'lg',
                                    children: [
                                        {
                                            label: "糖果壳",
                                            children: [
                                                {
                                                    label: 'LG G6',
                                                    sku: 'ZYULGG6',
                                                    x: 216,
                                                    y: 19,
                                                    width: 382,
                                                    height: 762
                                                },
                                                {
                                                    label: 'LG G6',
                                                    sku: 'ZSCBKLGG6',
                                                    x: 220,
                                                    y: 32,
                                                    width: 360,
                                                    height: 738
                                                },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    label: 'oppo',
                                    children: [
                                        {
                                            label: "透明壳",
                                            children: [
                                                {
                                                    label: 'OPPO A57/A39',
                                                    sku: 'ZYUOPA57',
                                                    x: 216,
                                                    y: 26,
                                                    width: 378,
                                                    height: 752
                                                }, {
                                                    label: 'OPPO A83',
                                                    sku: 'ZYUOPA83',
                                                    x: 217,
                                                    y: 26,
                                                    width: 382,
                                                    height: 752
                                                }, {
                                                    label: 'OPPO F11',
                                                    sku: 'ZYUOPF11',
                                                    x: 215,
                                                    y: 19,
                                                    width: 380,
                                                    height: 770
                                                }, {
                                                    label: 'OPPO F11 PRO',
                                                    sku: 'ZYUOPF11PRO',
                                                    x: 214,
                                                    y: 28,
                                                    width: 371,
                                                    height: 757
                                                }, {
                                                    label: 'OPPO K1',
                                                    sku: 'ZYUOPK1',
                                                    x: 220,
                                                    y: 23,
                                                    width: 371,
                                                    height: 762
                                                }, {
                                                    label: 'OPPO A5s',
                                                    sku: 'ZYUOPA5S',
                                                    x: 221,
                                                    y: 26,
                                                    width: 372,
                                                    height: 751
                                                },
                                                {
                                                    label: 'OPPO A5 (2020)/A9 (2020)',
                                                    sku: 'ZYUOPA520',
                                                    x: 222,
                                                    y: 16,
                                                    width: 362,
                                                    height: 766
                                                },
                                                {
                                                    label: 'oppo a3',
                                                    sku: 'ZSCBKOPA3',
                                                    x: 218,
                                                    y: 25,
                                                    width: 367,
                                                    height: 752
                                                }, {
                                                    label: 'oppo r17 pro',
                                                    sku: 'ZSCBKOPR17PRO',
                                                    x: 225,
                                                    y: 32,
                                                    width: 354,
                                                    height: 737
                                                },
                                            ]
                                        },
                                        {
                                            label: "糖果壳",
                                            children: [
                                                {
                                                    label: 'OPPO A5S',
                                                    x: 223,
                                                    y: 53,
                                                    width: 344,
                                                    height: 703,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLOPA5S'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKOPA5S'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDOPA5S'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNOPA5S'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEOPA5S'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPROPA5S'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKOPA5S'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'OPPO A5(2020)/A9 (2020)',
                                                    x: 223,
                                                    y: 23,
                                                    width: 354,
                                                    height: 753,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLOPA520'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKOPA520'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDOPA520'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNOPA520'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEOPA520'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPROPA520'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKOPA520'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'OPPO F15',
                                                    x: 236,
                                                    y: 50,
                                                    width: 328,
                                                    height: 702,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLOPF15'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKOPF15'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDOPF15'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNOPF15'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEOPF15'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPROPF15'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKOPF15'
                                                        },
                                                    ]
                                                }, {
                                                    label: 'OPPO F9',
                                                    x: 227,
                                                    y: 52,
                                                    width: 350,
                                                    height: 704,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLOPF9'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKOPF9'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDOPF9'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCRDOPF9'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEOPF9'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPROPF9'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKOPF9'
                                                        },
                                                    ]
                                                },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    label: '索尼',
                                    children: [
                                        {
                                            label: "透明壳",
                                            children: [
                                                {
                                                    label: '索尼 XA1',
                                                    sku: 'ZYUSNXA1',
                                                    x: 226,
                                                    y: 32,
                                                    width: 362,
                                                    height: 745
                                                },
                                                {
                                                    label: '索尼 XZ/XZs',
                                                    sku: 'ZYUSNXZ',
                                                    x: 228,
                                                    y: 26,
                                                    width: 362,
                                                    height: 753

                                                },
                                                {
                                                    label: '索尼 Z5',
                                                    sku: 'ZYUSNZ5',
                                                    x: 224,
                                                    y: 25,
                                                    width: 368,
                                                    height: 750
                                                },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    label: 'Realme',
                                    children: [
                                        {
                                            label: "透明壳",
                                            children: [
                                                {
                                                    label: 'REALME C1',
                                                    sku: 'ZYUREALMEC1',
                                                    x: 212,
                                                    y: 26,
                                                    width: 385,
                                                    height: 743
                                                }, {
                                                    label: 'REALME U1/OPPO F9',
                                                    sku: 'ZYUREALMEU1',
                                                    x: 213,
                                                    y: 26,
                                                    width: 382,
                                                    height: 741
                                                }, {
                                                    label: 'Realme C2/OPPO A1K',
                                                    sku: 'ZYUREALMEC2',
                                                    x: 234,
                                                    y: 17,
                                                    width: 356,
                                                    height: 765
                                                }, {
                                                    label: 'realme x',
                                                    sku: 'ZSCBKREALMEX',
                                                    x: 234,
                                                    y: 54,
                                                    width: 333,
                                                    height: 694
                                                },
                                            ]
                                        },
                                        {
                                            label: "糖果壳",
                                            children: [
                                                {
                                                    label: 'Realme 5 Pro',
                                                    x: 237,
                                                    y: 63,
                                                    width: 326,
                                                    height: 674,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLREALME5PRO'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKREALME5PRO'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDREALME5PRO'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNREALME5PRO'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEREALME5PRO'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRREALME5PRO'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKREALME5PRO'
                                                        },
                                                    ]
                                                }, {
                                                    label: 'Realme X2',
                                                    x: 227,
                                                    y: 41,
                                                    width: 347,
                                                    height: 717,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLREALMEX2'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKREALMEX2'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDREALMEX2'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNREALMEX2'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEREALMEX2'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRREALMEX2'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKREALMEX2'
                                                        },
                                                    ]
                                                }, {
                                                    label: 'Realme X2 Pro',
                                                    x: 236,
                                                    y: 63,
                                                    width: 326,
                                                    height: 674,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLREALMEX2PRO'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKREALMEX2PRO'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDREALMEX2PRO'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNREALMEX2PRO'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEREALMEX2PRO'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRREALMEX2PRO'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKREALMEX2PRO'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'Realme 3 Pro',
                                                    x: 237,
                                                    y: 63,
                                                    width: 326,
                                                    height: 674,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLREALME3PRO'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKREALME3PRO'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDREALME3PRO'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNREALME3PRO'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEREALME3PRO'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRREALME3PRO'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKREALME3PRO'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'Realme XT/X2',
                                                    x: 236,
                                                    y: 63,
                                                    width: 326,
                                                    height: 674,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLREALMEXT'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKREALMEXT'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDREALMEXT'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNREALMEXT'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEREALMEXT'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRREALMEXT'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKREALMEXT'
                                                        },
                                                    ]
                                                }, {
                                                    label: 'Realme X50-5G',
                                                    x: 236,
                                                    y: 63,
                                                    width: 316,
                                                    height: 674,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLREALMEX50'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKREALMEX50'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDREALMEX50'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNREALMEX50'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEREALMEX50'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRREALMEX50'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKREALMEX50'
                                                        },
                                                    ]
                                                },
                                            ]
                                        }

                                    ]
                                },
                                {
                                    label: 'vivo',
                                    children: [
                                        {
                                            label: "透明壳",
                                            children: [
                                                {
                                                    label: 'VIVO V15',
                                                    sku: 'ZYUVIV15',
                                                    x: 227,
                                                    y: 20,
                                                    width: 372,
                                                    height: 764
                                                }, {
                                                    label: 'VIVO V15 Pro',
                                                    sku: 'ZYUVIV15PRO',
                                                    x: 220,
                                                    y: 17,
                                                    width: 370,
                                                    height: 760
                                                }, {
                                                    label: 'VIVO Y17/Y15/Y12',
                                                    sku: 'ZYUVIY17',
                                                    x: 224,
                                                    y: 23,
                                                    width: 370,
                                                    height: 760
                                                }, {
                                                    label: 'VIVO Y81',
                                                    sku: 'ZYUVIY81',
                                                    x: 227,
                                                    y: 17,
                                                    width: 367,
                                                    height: 766
                                                }, {
                                                    label: 'VIVO Y91i',
                                                    sku: 'ZYUVIVOY91I',
                                                    x: 226,
                                                    y: 19,
                                                    width: 364,
                                                    height: 760
                                                }, {
                                                    label: 'VIVO Y95',
                                                    sku: 'ZYUVIY95',
                                                    x: 217,
                                                    y: 27,
                                                    width: 372,
                                                    height: 753
                                                }, {
                                                    label: 'VIVO S1(国际版)',
                                                    sku: 'ZYUVIS1',
                                                    x: 226,
                                                    y: 22,
                                                    width: 358,
                                                    height: 760
                                                }, {
                                                    label: 'VIVO S1 Pro(国际版)',
                                                    sku: 'ZYUVIS1PRO',
                                                    x: 231,
                                                    y: 26,
                                                    width: 350,
                                                    height: 749
                                                }, {
                                                    label: 'VIVO Z1',
                                                    sku: 'ZYUVIZ1',
                                                    x: 221,
                                                    y: 17,
                                                    width: 375,
                                                    height: 768
                                                }, {
                                                    label: 'VIVO Z1 PRO',
                                                    sku: 'ZYUVIZ1PRO',
                                                    x: 215,
                                                    y: 29,
                                                    width: 369,
                                                    height: 745
                                                },
                                            ]
                                        },
                                        {
                                            label: "糖果壳",
                                            children: [
                                                {
                                                    label: 'Vivo S1（国外版）',
                                                    x: 220,
                                                    y: 24,
                                                    width: 361,
                                                    height: 751,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLVIS1'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKVIS1'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDVIS1'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNVIS1'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEVIS1'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRVIS1'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKVIS1'
                                                        },
                                                    ]
                                                }, {
                                                    label: 'Vivo S1 Pro（国外版）',
                                                    x: 236,
                                                    y: 56,
                                                    width: 328,
                                                    height: 688,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLVIS1PRO'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKVIS1PRO'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDVIS1PRO'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNVIS1PRO'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEVIS1PRO'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRVIS1PRO'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKVIS1PRO'
                                                        },
                                                    ]
                                                }, {
                                                    label: 'Vivo Z1',
                                                    x: 218,
                                                    y: 41,
                                                    width: 355,
                                                    height: 707,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLVIZ1'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKVIZ1'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCLTPKVIZ1'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNVIZ1'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEVIZ1'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRVIZ1'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKVIZ1'
                                                        },
                                                    ]
                                                }, {
                                                    label: 'VIVO Z1 PRO',
                                                    x: 219,
                                                    y: 46,
                                                    width: 362,
                                                    height: 709,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLVIZ1PRO'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKVIZ1PRO'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDVIZ1PRO'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNVIZ1PRO'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEVIZ1PRO'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRVIZ1PRO'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKVIZ1PRO'
                                                        },
                                                    ]
                                                }, {
                                                    label: 'Vivo Y12/Y15/Y17',
                                                    x: 193,
                                                    y: 11,
                                                    width: 334,
                                                    height: 687,
                                                    children: [
                                                        {
                                                            label: '黄色',
                                                            sku: 'ZSCYLVIY12'
                                                        }, {
                                                            label: '淡粉色',
                                                            sku: 'ZSCLTPKVIY12'
                                                        }, {
                                                            label: '红色',
                                                            sku: 'ZSCRDVIY12'
                                                        }, {
                                                            label: '绿色',
                                                            sku: 'ZSCGNVIY12'
                                                        }, {
                                                            label: '纯白色',
                                                            sku: 'ZSCTRWEVIY12'
                                                        }, {
                                                            label: '淡紫色',
                                                            sku: 'ZSCLTPRVIY12'
                                                        }, {
                                                            label: '黑色',
                                                            sku: 'ZSCBKVIY12'
                                                        },
                                                    ]
                                                },
                                            ]
                                        }

                                    ]
                                },
                            ],
                            show: true
                        }]
                    },
                    {
                        children: [
                            {
                                children: [
                                    {
                                        imageSku: "YLMANRDXS-H",
                                        label: "XS",
                                        sku: "YLMANRDXS"
                                    },
                                    {
                                        imageSku: "YLMANRDS-H",
                                        label: "S",
                                        sku: "YLMANRDS"
                                    },
                                    {
                                        imageSku: "YLMANRDM-H",
                                        label: "M",
                                        sku: "YLMANRDM"
                                    },
                                    {
                                        imageSku: "YLMANRDL-H",
                                        label: "L",
                                        sku: "YLMANRDL"
                                    },
                                    {
                                        imageSku: "YLMANRDXL-H",
                                        label: "XL",
                                        sku: "YLMANRDXL"
                                    },
                                    {
                                        imageSku: "YLMANRD2XL-H",
                                        label: "2XL",
                                        sku: "YLMANRD2XL"
                                    },
                                    {
                                        imageSku: "YLMANRD3XL-H",
                                        label: "3XL",
                                        sku: "YLMANRD3XL"
                                    }
                                ],
                                x: 220,
                                width: 335,
                                y: 187,
                                label: "竖-红",
                                height: 471
                            },
                            {
                                children: [
                                    {
                                        imageSku: "YLMANRDXS-W",
                                        label: "XS",
                                        sku: "YLMANRDXS"
                                    },
                                    {
                                        imageSku: "YLMANRDS-W",
                                        label: "S",
                                        sku: "YLMANRDS"
                                    },
                                    {
                                        imageSku: "YLMANRDM-W",
                                        label: "M",
                                        sku: "YLMANRDM"
                                    },
                                    {
                                        imageSku: "YLMANRDL-W",
                                        label: "L",
                                        sku: "YLMANRDL"
                                    },
                                    {
                                        imageSku: "YLMANRDXL-W",
                                        label: "XL",
                                        sku: "YLMANRDXL"
                                    },
                                    {
                                        imageSku: "YLMANRD2XL-W",
                                        label: "2XL",
                                        sku: "YLMANRD2XL"
                                    },
                                    {
                                        imageSku: "YLMANRD3XL-W",
                                        label: "3XL",
                                        sku: "YLMANRD3XL"
                                    }
                                ],
                                x: 181,
                                y: 239,
                                width: 410,
                                label: "横-红",
                                height: 296
                            },
                            {
                                children: [
                                    {
                                        imageSku: "YLMANBKXS-H",
                                        label: "XS",
                                        sku: "YLMANBKXS"
                                    },
                                    {
                                        imageSku: "YLMANBKS-H",
                                        label: "S",
                                        sku: "YLMANBKS"
                                    },
                                    {
                                        imageSku: "YLMANBKM-H",
                                        label: "M",
                                        sku: "YLMANBKM"
                                    },
                                    {
                                        imageSku: "YLMANBKL-H",
                                        label: "L",
                                        sku: "YLMANBKL"
                                    },
                                    {
                                        imageSku: "YLMANBKXL-H",
                                        label: "XL",
                                        sku: "YLMANBKXL"
                                    },
                                    {
                                        imageSku: "YLMANBK2XL-H",
                                        label: "2XL",
                                        sku: "YLMANBK2XL"
                                    },
                                    {
                                        imageSku: "YLMANBK3XL-H",
                                        label: "3XL",
                                        sku: "YLMANBK3XL"
                                    },
                                    {
                                        imageSku: "YLMANBK4XL-H",
                                        label: "4XL",
                                        sku: "YLMANBK4XL"
                                    },
                                    {
                                        imageSku: "YLMANBK5XL-H",
                                        label: "5XL",
                                        sku: "YLMANBK5XL"
                                    },
                                    {
                                        imageSku: "YLMANBK6XL-H",
                                        label: "6XL",
                                        sku: "YLMANBK6XL"
                                    }
                                ],
                                x: 227,
                                width: 328,
                                y: 187,
                                label: "竖-黑",
                                height: 462
                            },
                            {
                                children: [
                                    {
                                        imageSku: "YLMANBKXS-W",
                                        label: "XS",
                                        sku: "YLMANBKXS"
                                    },
                                    {
                                        imageSku: "YLMANBKS-W",
                                        label: "S",
                                        sku: "YLMANBKS"
                                    },
                                    {
                                        imageSku: "YLMANBKM-W",
                                        label: "M",
                                        sku: "YLMANBKM"
                                    },
                                    {
                                        imageSku: "YLMANBKL-W",
                                        label: "L",
                                        sku: "YLMANBKL"
                                    },
                                    {
                                        imageSku: "YLMANBKXL-W",
                                        label: "XL",
                                        sku: "YLMANBKXL"
                                    },
                                    {
                                        imageSku: "YLMANBK2XL-W",
                                        label: "2XL",
                                        sku: "YLMANBK2XL"
                                    },
                                    {
                                        imageSku: "YLMANBK3XL-W",
                                        label: "3XL",
                                        sku: "YLMANBK3XL"
                                    },
                                    {
                                        imageSku: "YLMANBK4XL-W",
                                        label: "4XL",
                                        sku: "YLMANBK4XL"
                                    },
                                    {
                                        imageSku: "YLMANBK5XL-W",
                                        label: "5XL",
                                        sku: "YLMANBK5XL"
                                    },
                                    {
                                        imageSku: "YLMANBK6XL-W",
                                        label: "6XL",
                                        sku: "YLMANBK6XL"
                                    }
                                ],
                                x: 201,
                                width: 406,
                                y: 257,
                                label: "横-黑",
                                height: 289
                            },
                            {
                                children: [
                                    {
                                        imageSku: "YLMANWEXS-H",
                                        label: "XS",
                                        sku: "YLMANWEXS"
                                    },
                                    {
                                        imageSku: "YLMANWES-H",
                                        label: "S",
                                        sku: "YLMANWES"
                                    },
                                    {
                                        imageSku: "YLMANWEM-H",
                                        label: "M",
                                        sku: "YLMANWEM"
                                    },
                                    {
                                        imageSku: "YLMANWEL-H",
                                        label: "L",
                                        sku: "YLMANWEL"
                                    },
                                    {
                                        imageSku: "YLMANWEXL-H",
                                        label: "XL",
                                        sku: "YLMANWEXL"
                                    },
                                    {
                                        imageSku: "YLMANWE2XL-H",
                                        label: "2XL",
                                        sku: "YLMANWE2XL"
                                    },
                                    {
                                        imageSku: "YLMANWE3XL-H",
                                        label: "3XL",
                                        sku: "YLMANWE3XL"
                                    },
                                    {
                                        imageSku: "YLMANWE4XL-H",
                                        label: "4XL",
                                        sku: "YLMANWE4XL"
                                    },
                                    {
                                        imageSku: "YLMANWE5XL-H",
                                        label: "5XL",
                                        sku: "YLMANWE5XL"
                                    },
                                    {
                                        imageSku: "YLMANWE6XL-H",
                                        label: "6XL",
                                        sku: "YLMANWE6XL"
                                    }
                                ],
                                x: 244,
                                width: 314,
                                y: 193,
                                label: "竖-白",
                                height: 450
                            },
                            {
                                children: [
                                    {
                                        imageSku: "YLMANWEXS-W",
                                        label: "XS",
                                        sku: "YLMANWEXS"
                                    },
                                    {
                                        imageSku: "YLMANWES-W",
                                        label: "S",
                                        sku: "YLMANWES"
                                    },
                                    {
                                        imageSku: "YLMANWEM-W",
                                        label: "M",
                                        sku: "YLMANWEM"
                                    },
                                    {
                                        imageSku: "YLMANWEL-W",
                                        label: "L",
                                        sku: "YLMANWEL"
                                    },
                                    {
                                        imageSku: "YLMANWEXL-W",
                                        label: "XL",
                                        sku: "YLMANWEXL"
                                    },
                                    {
                                        imageSku: "YLMANWE2XL-W",
                                        label: "2XL",
                                        sku: "YLMANWE2XL"
                                    },
                                    {
                                        imageSku: "YLMANWE3XL-W",
                                        label: "3XL",
                                        sku: "YLMANWE3XL"
                                    },
                                    {
                                        imageSku: "YLMANWE4XL-W",
                                        label: "4XL",
                                        sku: "YLMANWE4XL"
                                    },
                                    {
                                        imageSku: "YLMANWE5XL-W",
                                        label: "5XL",
                                        sku: "YLMANWE5XL"
                                    },
                                    {
                                        imageSku: "YLMANWE6XL-W",
                                        label: "6XL",
                                        sku: "YLMANWE6XL"
                                    }
                                ],
                                x: 221,
                                width: 382,
                                y: 264,
                                label: "横-白",
                                height: 275
                            },
                            {
                                children: [
                                    {
                                        imageSku: "YLMANPKS-H",
                                        label: "S",
                                        sku: "YLMANPKS"
                                    },
                                    {
                                        imageSku: "YLMANPKM-H",
                                        label: "M",
                                        sku: "YLMANPKM"
                                    },
                                    {
                                        imageSku: "YLMANPKL-H",
                                        label: "L",
                                        sku: "YLMANPKL"
                                    },
                                    {
                                        imageSku: "YLMANPKXL-H",
                                        label: "XL",
                                        sku: "YLMANPKXL"
                                    },
                                    {
                                        imageSku: "YLMANPK2XL-H",
                                        label: "2XL",
                                        sku: "YLMANPK2XL"
                                    },
                                    {
                                        imageSku: "YLMANPK3XL-H",
                                        label: "3XL",
                                        sku: "YLMANPK3XL"
                                    }
                                ],
                                x: 242,
                                width: 319,
                                y: 189,
                                label: "竖-粉",
                                sku: "",
                                height: 445
                            },
                            {
                                children: [
                                    {
                                        imageSku: "YLMANPKS-W",
                                        label: "S",
                                        sku: "YLMANPKS"
                                    },
                                    {
                                        imageSku: "YLMANPKM-W",
                                        label: "M",
                                        sku: "YLMANPKM"
                                    },
                                    {
                                        imageSku: "YLMANPKL-W",
                                        label: "L",
                                        sku: "YLMANPKL"
                                    },
                                    {
                                        imageSku: "YLMANPKXL-W",
                                        label: "XL",
                                        sku: "YLMANPKXL"
                                    },
                                    {
                                        imageSku: "YLMANPK2XL-W",
                                        label: "2XL",
                                        sku: "YLMANPK2XL"
                                    },
                                    {
                                        imageSku: "YLMANPK3XL-W",
                                        label: "3XL",
                                        sku: "YLMANPK3XL"
                                    }
                                ],
                                x: 208,
                                width: 382,
                                y: 282,
                                label: "横-粉",
                                height: 274
                            },
                            {
                                children: [
                                    {
                                        imageSku: "YLMANNAXS-H",
                                        label: "XS",
                                        sku: "YLMANNAXS"
                                    },
                                    {
                                        imageSku: "YLMANNAS-H",
                                        label: "S",
                                        sku: "YLMANNAS"
                                    },
                                    {
                                        imageSku: "YLMANNAM-H",
                                        label: "M",
                                        sku: "YLMANNAM"
                                    },
                                    {
                                        imageSku: "YLMANNAL-H",
                                        label: "L",
                                        sku: "YLMANNAL"
                                    },
                                    {
                                        imageSku: "YLMANNAXL-H",
                                        label: "XL",
                                        sku: "YLMANNAXL"
                                    },
                                    {
                                        imageSku: "YLMANNA2XL-H",
                                        label: "2XL",
                                        sku: "YLMANNA2XL"
                                    },
                                    {
                                        imageSku: "YLMANNA3XL-H",
                                        label: "3XL",
                                        sku: "YLMANNA3XL"
                                    }
                                ],
                                x: 247,
                                width: 315,
                                y: 173,
                                label: "竖-藏青",
                                height: 444
                            },
                            {
                                children: [
                                    {
                                        imageSku: "YLMANNAXS-W",
                                        label: "XS",
                                        sku: "YLMANNAXS"
                                    },
                                    {
                                        imageSku: "YLMANNAS-W",
                                        label: "S",
                                        sku: "YLMANNAS"
                                    },
                                    {
                                        imageSku: "YLMANNAM-W",
                                        label: "M",
                                        sku: "YLMANNAM"
                                    },
                                    {
                                        imageSku: "YLMANNAL-W",
                                        label: "L",
                                        sku: "YLMANNAL"
                                    },
                                    {
                                        imageSku: "YLMANNAXL-W",
                                        label: "XL",
                                        sku: "YLMANNAXL"
                                    },
                                    {
                                        imageSku: "YLMANNA2XL-W",
                                        label: "2XL",
                                        sku: "YLMANNA2XL"
                                    },
                                    {
                                        imageSku: "YLMANNA3XL-W",
                                        label: "3XL",
                                        sku: "YLMANNA3XL"
                                    }
                                ],
                                x: 199,
                                width: 404,
                                y: 241,
                                label: "横-藏青",
                                height: 295
                            },
                            {
                                children: [
                                    {
                                        imageSku: "YLMANPKS-H",
                                        label: "S",
                                        sku: "YLMANPKS"
                                    },
                                    {
                                        imageSku: "YLMANPKM-H",
                                        label: "M",
                                        sku: "YLMANPKM"
                                    },
                                    {
                                        imageSku: "YLMANPKL-H",
                                        label: "L",
                                        sku: "YLMANPKL"
                                    },
                                    {
                                        imageSku: "YLMANPKXL-H",
                                        label: "XL",
                                        sku: "YLMANPKXL"
                                    },
                                    {
                                        imageSku: "YLMANPK2XL-H",
                                        label: "2XL",
                                        sku: "YLMANPK2XL"
                                    },
                                    {
                                        imageSku: "YLMANPK3XL-H",
                                        label: "3XL",
                                        sku: "YLMANPK3XL"
                                    }
                                ],
                                x: 228,
                                width: 337,
                                y: 167,
                                label: "竖-灰",
                                height: 471
                            },
                            {
                                children: [
                                    {
                                        imageSku: "YLMANPKS-W",
                                        label: "S",
                                        sku: "YLMANPKS"
                                    },
                                    {
                                        imageSku: "YLMANPKM-W",
                                        label: "M",
                                        sku: "YLMANPKM"
                                    },
                                    {
                                        imageSku: "YLMANPKL-W",
                                        label: "L",
                                        sku: "YLMANPKL"
                                    },
                                    {
                                        imageSku: "YLMANPKXL-W",
                                        label: "XL",
                                        sku: "YLMANPKXL"
                                    },
                                    {
                                        imageSku: "YLMANPK2XL-W",
                                        label: "2XL",
                                        sku: "YLMANPK2XL"
                                    },
                                    {
                                        imageSku: "YLMANPK3XL-W",
                                        label: "3XL",
                                        sku: "YLMANPK3XL"
                                    }
                                ],
                                x: 173,
                                width: 381,
                                y: 253,
                                label: "横-灰",
                                height: 282
                            }
                        ],
                        label: "衣服"
                    },
                    {
                        label: 'iPad电脑',
                        children: [
                            {
                                label: '白色折叠iPad',
                                sku: '',
                                x: 154,
                                y: 40,
                                width: 493,
                                height: 721
                            }, {
                                label: '黑色折叠iPad',
                                sku: '',
                                x: 154,
                                y: 40,
                                width: 493,
                                height: 721
                            }, {
                                label: '透明iPad',
                                sku: '',
                                x: 159,
                                y: 39,
                                width: 489,
                                height: 728
                            }, {
                                label: '黑色电脑壳',
                                sku: 'DZDNKBK00A1278',
                                x: 27,
                                y: 140,
                                width: 750,
                                height: 522
                            }, {
                                label: '透明电脑壳',
                                sku: 'DZDNKTR00A1278',
                                x: 27,
                                y: 140,
                                width: 750,
                                height: 522
                            },
                        ]
                    },
                ],
                flags: true,//手指离开图片时判断值
                imgUrl:[],
                imgW:'',//图片宽度
                imgH:"",//图片高度
                resImage:"",
                lastImg:{rotate: 0, w:0, h:0},//图片数据
                canvasTranslateX: "",//画布位移
                canvasTranslateY:"",
                canvasTranslateW:"",//画布宽
                canvasTranslateH:"",
                // isShow:false
            }
        }
        ,
        methods: {
            // 监听手机壳点击触发事件
            handleNodeClick(data, node) {
                if (node.isLeaf) {
                    fabric.canvas.clear();
                    this.currentNode = node;
                    if (data.imageSku) {
                        this.imgSku = data.imageSku;
                        // this.isShow = true;
                        fabric.canvas.clear();
                        const img = new Image();
                        this.imgUrl = img.src;

                        img.onload = () => {
                            const w = img.width;
                            const h = img.height;
                            const scale = this.getScale(w, h);
                            const maxW = w / scale;
                            const maxH = h / scale;
                            const imgObj = {
                                url: img,
                                width: maxW,
                                height: maxH
                            };
                            this.imgW = imgObj.width;
                            this.imgH = imgObj.height;
                        };
                        let that = this;
                            fabric.Image.fromURL(that.imgUrl, function(oImg) {
                                fabric.canvas.setWidth(that.canvasTranslateW+400);
                                fabric.canvas.setHeight(that.canvasTranslateH+200);
                                oImg.scale(0.5);//图片缩小10倍
                                oImg.set({
                                    left:200,
                                    top:100,
                                });
                                oImg.clipPath = fabric.clipPath;

                                fabric.canvas.add(oImg);
                                fabric.canvas.preserveObjectStacking = true;
                            });
                        fabric.clipPath = new fabric.Rect({width:data.width,height:data.height,top:100,left:200,absolutePositioned:true});
                        $(".pictureDisplay").css("display","block");
                        $("#myCanvas").css("display","block");
                    } else{
                        this.imgSku = data.sku;
                        // this.isShow = true;
                        fabric.canvas.clear();
                        const img = new Image();
                        this.imgUrl = img.imgUrl;
                        img.onload = () => {
                            const w = img.width;
                            const h = img.height;
                            const scale = this.getScale(w, h);
                            const maxW = w / scale;
                            const maxH = h / scale;
                            const imgObj = {
                                url: img,
                                width: maxW,
                                height: maxH
                            };
                            this.imgW = imgObj.width;
                            this.imgH = imgObj.height;
                        };
                        let that = this;
                        fabric.Image.fromURL(this.imgUrl, function(oImg) {
                            fabric.canvas.setWidth(that.canvasTranslateW+400);
                            fabric.canvas.setHeight(that.canvasTranslateH+200);
                            oImg.scale(0.5);//图片缩小10倍
                            oImg.set({
                                left:200,
                                top:100,
                            });
                            oImg.clipPath = fabric.clipPath;
                            fabric.canvas.add(oImg);
                            fabric.canvas.preserveObjectStacking = true;
                        });
                        fabric.clipPath = new fabric.Rect({width:data.width,height:data.height,top:100,left:200,absolutePositioned:true});
                        $(".pictureDisplay").css("display","block");
                        $("#myCanvas").css("display","block");
                    }
                    if (!data.width) {
                        data = node.parent.data;
                        fabric.clipPath = new fabric.Rect({width:data.width,height:data.height,top:100,left:200,absolutePositioned:true});
                        $(".pictureDisplay").css("display","block");
                        $("#myCanvas").css("display","block");

                    }
                    this.canvasTranslateX = data.x;
                    this.canvasTranslateY = data.y;
                    this.canvasTranslateW = data.width;
                    this.canvasTranslateH = data.height;
                    $('.canvas-container').css("left",this.canvasTranslateX-200);
                    $('.canvas-container').css("top",this.canvasTranslateY-100);
                    $('.canvas-container').css("width",this.canvasTranslateW);
                    $('.canvas-container').css("height",this.canvasTranslateH);
                    $('#myCanvas').css('width',this.canvasTranslateW);
                    $('#myCanvas').css('height',this.canvasTranslateH);
                    $('.upper-canvas').css('width',this.canvasTranslateW);
                    $('.upper-canvas').css('height',this.canvasTranslateH);
                }
            }
            ,
            //上传图片
            changeImage(e) {
                let imgUrlOne = "./webapp/static/images/customImage/.png";
                let imgUrlTwo = "./webapp/static/images/customImage/undefined.png";
                if ($('.pictureDisplay').attr("src") == imgUrlOne || $('.pictureDisplay').attr("src") == imgUrlTwo) {
                    this.Message("请先选择手机壳", 0);
                } else {
                    const fileObj = new FileReader();
                    fileObj.readAsDataURL(e.target.files[0]);
                    fileObj.onload = () => {
                        this.picReduce(fileObj.result, imgObj => {
                            this.imgArr.push(imgObj);
                        })
                    }

                }
            }
            ,
            //获取上传后图片宽高
            picReduce(picObj, callback) {
                const img = new Image();
                img.src = picObj;
                this.imgUrl = img.src;
                img.onload = () => {
                    const w = img.width;
                    const h = img.height;
                    const scale = this.getScale(w, h);
                    const maxW = w / scale;
                    const maxH = h / scale;
                    const imgObj = {
                        url: img,
                        width: maxW,
                        height: maxH
                    };
                    this.imgW = imgObj.width;
                    this.imgH = imgObj.height;
                    callback(imgObj);
                };
                let that = this;
                const width = this.canvasTranslateW;
                const height = this.canvasTranslateH;
                fabric.Image.fromURL(this.imgUrl, function(oImg) {
                    fabric.canvas.setWidth(that.canvasTranslateW+400);
                    fabric.canvas.setHeight(that.canvasTranslateH+200);
                    oImg.scale(0.5);//图片缩小10倍
                    oImg.set({
                        left:200,
                        top:100,
                    });
                    oImg.clipPath = fabric.clipPath;
                    fabric.canvas.add(oImg);
                    fabric.canvas.preserveObjectStacking = true;
                });
                fabric.clipPath = new fabric.Rect({width:width,height:height,top:100,left:200,absolutePositioned:true});
            },
            // 旋转
            getScale(width, height) {
                if (width >= height) {
                    if (height <= 120) {
                        return 1
                    } else {
                        return height / 120
                    }
                } else if (height > width) {
                    if (width <= 120) {
                        return 1
                    } else return width / 120
                }
            }
            ,
            // 编辑预览
            btnEdit() {
                // fabric.canvas.on('object:modified', (e) => {
                //     // console.log(e.target) // e.target为当前编辑的Object
                //     // // ...旋转，缩放，移动等编辑图层的操作都监听到
                //     // // 所以如果有撤销/恢复的场景，这里可以保存编辑状态
                //     selection:cleared
                // });

                fabric.canvas.discardActiveObject().renderAll();
                // 编辑预览功能
                let that = this;
                if (that.flags) {
                    $(".btnEdit").text("编辑");
                    $(".phoneCase").css({
                        "overflow": "hidden"
                    });
                    $(".pictureDisplay").css({
                        "z-index": 1000
                    });
                    that.flags = false;
                } else if (that.flags == false) {
                    $(".btnEdit").text("定制效果");

                    $(".phoneCase").css({
                        "overflow": "visible"
                    });
                    $(".pictureDisplay").css({
                        "z-index": 0
                    });
                    that.flags = true;
                }
            }
            ,
            // 提示框
            Message(message, type) {
                let messageJQ = $("<div class='showMessage'>" + message + "</div>");
                if (type == 0) {
                    messageJQ.addClass("showMessageError");
                } else if (type == 1) {
                    messageJQ.addClass("showMessageSuccess");
                }
                messageJQ.hide().appendTo("body").slideDown(300);
                window.setTimeout(function () {
                    messageJQ.remove();
                }, 3000);
            }
            ,
            //保存提交按钮
            saveSubmit() {
                   let org = fabric.canvas.toDataURL("image/png");
                   let _this = this;
                   var canvas = document.createElement('canvas');
                  // $('.imagePackage').append(canvas);
                   var ctx = canvas.getContext("2d");
                    canvas.width =  this.canvasTranslateW;
                    canvas.height = this.canvasTranslateH;
                   let img = new Image();
                   img.src = org;
                   img.crossOrigin = 'Anonymous';
                   img.onload = function(){
                        ctx.drawImage(this,200,100,_this.canvasTranslateW,_this.canvasTranslateH,0,0,_this.canvasTranslateW,_this.canvasTranslateH);
                       _this.resImage = canvas.toDataURL('image/png');
                   };
                $('#bounced_btn').attr('disabled', "true");
            }
            ,
            // 弹窗缩放移动
            bouncedMove() {
                //窗口移动
                $(".messageBox").mousedown(function (event) {
                    let isMove = true;
                    let abs_x = event.pageX - $('div.bounced').offset().left;
                    let abs_y = event.pageY - $('div.bounced').offset().top;
                    $(document).mousemove(function (event) {
                        if (isMove) {
                            let obj = $('div.bounced');
                            let left_x = event.pageX - abs_x;
                            let top_y = event.pageY - abs_y;
                            obj.css({
                                'left': left_x,
                                'top': top_y
                            });
                        }
                    }).mouseup(function () {
                        isMove = false;
                    });
                });

                //窗口缩放
                let oDiv = document.getElementById('bounced');
                oDiv.onmousedown = function (ev) {
                    // 获取event对象，兼容性写法
                    var ev = ev || event;
                    // 鼠标按下时的位置
                    let mouseDownX = ev.clientX;
                    let mouseDownY = ev.clientY;
                    // 方块上下左右四个边的位置和方块的长宽
                    let T0 = this.offsetTop;
                    let B0 = this.offsetTop + this.offsetHeight;
                    let L0 = this.offsetLeft;
                    let R0 = this.offsetLeft + this.offsetWidth;
                    let W = this.offsetWidth;
                    let H = this.offsetHeight;
                    // 设置方块的识别范围
                    let areaT = T0 + 10;
                    let areaB = B0 - 10;
                    let areaL = L0 + 10;
                    let areaR = R0 - 10;
                    // 判断改变方块的大小的方向
                    // 左
                    let changeL = mouseDownX < areaL;
                    // 右
                    let changeR = mouseDownX > areaR;
                    // 上
                    let changeT = mouseDownY < areaT;
                    // 下
                    let changeB = mouseDownY > areaB;
                    // IE8 取消默认行为-设置全局捕获
                    if (oDiv.setCapture) {
                        oDiv.setCapture();
                    }
                    document.onmousemove = function (ev) {
                        var ev = ev || event;
                        // 鼠标移动时的鼠标位置
                        let mouseMoveX = ev.clientX;
                        let mouseMoveY = ev.clientY;
                        //根据改变方块大小的方向不同进行大小的改变
                        // 左
                        if (changeL) {
                            oDiv.style.width = (mouseDownX - mouseMoveX) + W + 'px';
                            oDiv.style.left = L0 - (mouseDownX - mouseMoveX) + 'px';
                        }
                        // 右
                        if (changeR) {
                            oDiv.style.width = (mouseMoveX - mouseDownX) + W + 'px';
                        }
                        // 上
                        if (changeT) {
                            oDiv.style.height = (mouseDownY - mouseMoveY) + H + 'px';
                            oDiv.style.top = T0 - (mouseDownY - mouseMoveY) + 'px';
                        }
                        // 下
                        if (changeB) {
                            oDiv.style.height = (mouseMoveY - mouseDownY) + H + 'px';
                        }
                        // 限定范围
                        if (parseInt(oDiv.style.width) < 50) {
                            oDiv.style.width = 50 + 'px';
                        }
                        if (parseInt(oDiv.style.height) < 50) {
                            oDiv.style.height = 50 + 'px';
                        }
                    };
                    document.onmouseup = function () {
                        document.onmousemove = null;
                        // 释放全局捕获
                        if (oDiv.releaseCapture) {
                            oDiv.releaseCapture();
                        }
                    };
                    return false;
                }
            }
            ,
            // 弹窗
            bouncedOpen() {
                let that = this;
                let imgUrlOne = "./webapp/static/images/.png";
                let imgUrlTwo = "./webapp/static/images/undefined.png";
                $(".bounced").hide();
                $("#bounced_btn").click(function () {
                    if (that.imgUrl.length == '') {
                        $('#bounced_btn').removeAttr("disabled");
                        $('.imagePackage canvas').remove();
                        that.Message("请先上传图片", 0)
                    } else if ($('.pictureDisplay').attr("src") == imgUrlOne || $('.pictureDisplay').attr("src") == imgUrlTwo) {
                        $('#bounced_btn').removeAttr("disabled");
                        $('.imagePackage canvas').remove();
                        that.Message("请选择手机壳类型", 0)
                    } else if (that.imgUrl.length > 0) {
                        $(".bounced").fadeIn(300);
                        $("#close_x").click(function () {
                            $('.imagePackage canvas').remove();
                            $('#bounced_btn').removeAttr("disabled");
                            $(".bounced").fadeOut(200);
                        });
                    }
                });
            }
            ,
            // 确定点击事件
            btnTrue() {
                let that = this;
                $(".bounced").fadeOut(200);
                let inpNumber = $(".inpNumber").val();
                let inpRemark = $(".inpRemark").val();
                let originalImage = this.imgUrl.split(",")[1];
                let cropImage = this.resImage.split(",")[1];
                let imgSku = this.imgSku;
                let obj = {
                    orderId: "",
                    productSku: imgSku,
                    quantity: inpNumber,
                    remarks: inpRemark,
                    cropImage: cropImage,
                    originalImage: originalImage
                };
                if ($(".inpNumber").val().length) {
                    Axios(
                        {
                            url: "/custom/alibaba/save",
                            data: JSON.stringify(obj),
                            method: "post",
                            headers: {
                                "Content-Type": "application/json;charset=UTF-8"
                            },
                        }).then(response => {
                        let data = response.data;
                        if (data) {
                            that.Message(data.msg, 1);
                        } else {
                            that.Message(data.msg, 0);
                        }
                    }).catch(() => {
                        that.Message("保存出现错误", 0);
                    })
                } else {
                    that.Message("请先输入数量", 0);
                }
                $('.imagePackage canvas').remove();
                $('#bounced_btn').removeAttr("disabled");
            }
            ,
        }
        ,
        mounted() {
            this.bouncedMove();
            this.bouncedOpen();
            fabric.canvas = new fabric.Canvas('myCanvas');
            fabric.Canvas.prototype.customiseControls({
                tl: {
                    action: 'moveUp',
                    cursor: "pointer"
                },
                tr: {
                    action: 'remove',
                    cursor: "pointer"
                },
                bl: {
                    action: 'rotate',
                    cursor: "pointer"
                },
                br: {
                    action: 'scale',
                    cursor: "pointer"
                },
            });
            fabric.Object.prototype.customiseCornerIcons({
                settings: {
                    borderColor: 'black',
                    cornerSize: 30,
                    cornerShape: 'rect',
                    cornerBackgroundColor: 'pink',
                    cornerPadding: 10
                },
                tl: {
                    icon: moveIcon
                },
                tr: {
                    icon: deleteIcon
                },
                br: {
                    icon: scaleIcon
                },
                bl: {
                    icon: rotateIcon
                },
                function() {
                    fabric.canvas.renderAll();
                }
            });
            fabric.Object.prototype.set({
                hasRotatingPoint: false, //是否显示旋转按钮
                hasBorders : false,
            });
            // console.log(rotate)
        }
    }
</script>
<style scoped>
    @import url('../../static/animated.css');
    @import url('../assets/custom.css');
</style>