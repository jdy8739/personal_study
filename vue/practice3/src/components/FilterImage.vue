<template>
    <div>
        <div :class="`filter-1 ${ filter }`" :style="{ backgroundImage: `url(${ image }` }" @click="useFilter($event)">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FilterImage',
    props: {
        image: {
            type: String,
            required: true
        },
        filter: {
            type: String
        }
    },
    methods: {
        useFilter(event) {
            const filterName = event.target.innerText;
            this.emitter.emit('useFilter', filterName);
        }
    }
}
</script>