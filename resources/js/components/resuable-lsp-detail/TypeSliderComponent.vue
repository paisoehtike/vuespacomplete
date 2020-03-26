<template>
    <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="(onuType, index) in onuTypes" :key="index">{{ onuType }}</swiper-slide>
    </swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
    name: 'swiper-example-free-mode',
    title: 'Free mode / No fixed positions',
    props: [
        'type',
    ],
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            swiperOption: {
                slidesPerView: 3,
                spaceBetween: 18,
                freeMode: true,
            },
            onuTypes: [],
        }
    },
    methods: {
        addType() {
            this.onuTypes = this.type;
        },
        lightOnClick() {
            let swipeHead = shadowRoot.getElementByClassName('swiper');
            let swipeItems = swipeHead.getElementsByTagName('swiper-slide');
            for (var i=0; i < swipeItems.length; i++) {
                swipeItems[i].addEventListener("click", () => {
                    let current = shadowRoot.getElementsByClassName("selected");
                    if(current) {
                        current[0].className = current[0].className.replace(" selected", "");
                    }
                    this.className += " selected";
                })
            }
        }
    },
    mounted() {
        this.addType();
        // this.lightOnClick();
    }
}
</script>