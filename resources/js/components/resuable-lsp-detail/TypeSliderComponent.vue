<template>
    <swiper class="swiper" :options="swiperOption">
        <swiper-slide
        v-if="isRelocation == 'relocation'"
        @click.native="typeOnClick(0)"
        :class="{onClick:selected == 0}">
            None
        </swiper-slide>
        <swiper-slide
        @click.native="typeOnClick(typer)"
        :class="{onClick:selected == typer.id}" 
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
    props: [
        'type', 'defaultId', 'isInstallation', 'isRelocation', 'isComplete',
    ],
    name: 'swiper-example-free-mode',
    title: 'Free mode / No fixed positions',
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            selected: null,
            complete: null,
            swiperOption: {
                slidesPerView: 3,
                spaceBetween: 18,
                freeMode: true,
            },
        }
    },
    methods: {
        typeOnClick(typer) {
            if(!this.isComplete) {
                if(typer == 0) {
                    this.selected = 0;
                    this.$emit('type-id', null);
                } else {
                    if (this.isInstallation) {
                        this.selected = typer.id;
                        this.$emit('type-id', typer.id);
                    } else {
                        if (this.selected == typer.id) {
                            this.selected = null;
                            this.$emit('type-id', null);
                        } else {
                            this.selected = typer.id;
                            this.$emit('type-id', typer.id);
                        }
                    }
                }
            }
        }
    },
    watch: {
        defaultId(val) {
            this.selected = val;
        }
    },
}
</script>