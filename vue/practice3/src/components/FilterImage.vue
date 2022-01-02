<template>
    <div>
        <div :class="`filter-1 ${ filter }`" :style="{ backgroundImage: `url(${ image }` }">
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
    }
}
</script>