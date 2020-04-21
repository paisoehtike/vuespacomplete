<template>
    <swiper class="swiper" :options="swiperOption">
        <swiper-slide
        @click.native="typeOnClick(typer, index)"
        :class="{onClick:selected == index}" 
        v-for="(typer, index) in type" 
        :key="index">
            {{ typer.name }}
        </swiper-slide>
    </swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
    name: 'swiper-example-free-mode',
    title: 'Free mode / No fixed positions',
    props: [
        'type'
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
            selected: null,
        }
    },
    methods: {
        typeOnClick(typer, index) {
            this.selected = index;
            this.$emit('type-id', typer.id);
        }
    }
}
</script>