export default defineNuxtConfig({
    postcss: {
        plugins: {
            'postcss-nested': {},
            'postcss-nested-ancestors': {},
            'postcss-preset-env': {},
        },
    },
})
