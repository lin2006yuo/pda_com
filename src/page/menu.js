export const menu = [
    {path:'/picking-process',query:{},name:'拣货任务',icon:require('@/assets/picking-process.png')},//拣货任务
    {path:'/mass-zone',query:{},name:'分拣集结',icon:require('@/assets/mass-zone.png')},//分拣集结
    {path:'/putaway-goods',query:{},name:'商品上架',icon:require('@/assets/putaway-goods.png')},//商品上架
    {path:'/putaway-order',query:{},name:'上架单管理',icon:require('@/assets/putaway-order.png')},//上架单管理
    {path:'/return-shelves-order',query:{},name:'重返上架单',icon:require('@/assets/return-shelves-order.png')},//重返上架单
    {path:'/reback-shelves-order',query:{},name:'退货上架单',icon:require('@/assets/reback-shelves-order.png')},//退货上架单
    {path:'/reback_shelves',query:{},name:'退货上架',icon:require('@/assets/reback_shelves.png')},//退货上架
    {path:'/package-transit',query:{},name:'集包中转',icon:require('@/assets/package-transit.png')},//集包中转
    {path:'/package-collection',query:{},name:'集包交接',icon:require('@/assets/package-collection.png')},//集包交接
    {path:'/take-stock',query:{},name:'库存盘点',icon:require('@/assets/take-stock.png')},//库存盘点
    {path:'/goods-shift',query:{},name:'商品移库',icon:require('@/assets/goods-shift.png')},//商品移库
    {path:'/barcode-check',query:{},name:'条码查询',icon:require('@/assets/barcode-check.png')},//条码查询
    {path:'/pickings-manage',query:{},name:'调拨拣货',icon:require('@/assets/allocation-picking.png')},//调拨拣货
    {path:'/soldout-shifting',query:{},name:'移库下架',icon:require('@/assets/soldout-shifting.png')},//移库下架
    {path:'/putaway-shifting',query:{},name:'移库上架',icon:require('@/assets/putaway-shifting.png')},//移库上架
]