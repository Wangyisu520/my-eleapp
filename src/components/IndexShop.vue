<template>
  <div class="index-container">
    <div class="index-shopInfo" @click="$router.push('/shop')">
      <!-- 左侧 -->
      <div class="logo_container">
        <img :src="restaurants.image_path" alt>
      </div>
      <!-- 右侧 -->
      <div class="index_main">
        <div class="index_shopname">
          <i v-if="restaurants.is_premium">品牌</i>
          <span>{{restaurants.name}}</span>
        </div>
        <div class="index-rateWrap">
          <div>
            <Rating :rating="restaurants.rating"/>
            <span class="rate">{{restaurants.rating}}</span>
            <span>月售{{restaurants.recent_order_num}}</span>
          </div>
          <div class="delivery" v-if="restaurants.delivery_mode">
            <span class="icon-hollow">{{restaurants.delivery_mode.text}}</span>
          </div>
        </div>
        <div class="index-moneylimit">
          <div>
            <span>￥{{restaurants.float_minimum_order_amount}}起送</span>
            <span>配送费￥{{restaurants.float_delivery_fee}}</span>
          </div>
          <div class="index-distanceWrap">
            <span>{{(restaurants.distance / 1000).toFixed(2)}}km</span>
            <span>{{restaurants.order_lead_time}}分钟</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Rating from './Rating'
export default {
  props: {
    restaurants: Object
  },
  components:{
      Rating
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.index-container {
  background: #fff;
  color: #666;
  padding: 4vw 0;
  border-bottom: 0.133333vw solid #eee;
}
.index-shopInfo {
  display: flex;
  justify-content: flex-start;
  padding: 0 2.666667vw;
  align-items: stretch;
}
.logo_container {
  width: 17.333333vw;
  height: 17.333333vw;
}
.logo_container img {
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 0.133333vw solid rgba(0, 0, 0, 0.08);
  border-radius: 0.533333vw;
}
.index_main {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  flex-direction: column;
  padding-left: 2.666667vw;
  font-size: 0.66rem;
  flex-grow: 1;
}
.index_shopname {
  align-items: center;
  color: #333;
  font-weight: 700;
  font-size: 0.9rem;
}
.index_shopname i {
  background: #ffe800;
  margin-right: 1.333333vw;
  padding: 0.266667vw 0.666667vw;
  text-align: center;
  white-space: nowrap;
  font-size: 0.6rem;
}
.index_shopname span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.index-rateWrap {
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-between;
}

.index-rateWrap .rate {
  margin-right: 1.066667vw;
}
.index-moneylimit {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.index-moneylimit .index-distanceWrap {
  color: #999;
}
.delivery {
  display: flex;
  align-items: center;
  font-size: 0.6rem;
  margin-left: 1.066667vw;
}
.delivery .icon-hollow {
  color: #fff;
  background-color: #2395ff;
  padding: 2px;
  box-sizing: border-box;
}
</style>