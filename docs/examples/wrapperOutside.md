# Wrapper outside example

Example with settings, `wrapperPlacement: 'outside'`

::: info STYLING
When applying styling such as padding or border will result in different result in position of scrollbar comparing to default (wrapper inside)
:::

<script setup>
import wrapperOutside from './wrapperOutside.vue'
</script>
<wrapperOutside/>

Before mount
```html
<div class="my-scrollbar">
    ...content
</div>
```

After mount
```html
<div class="light-scrollbar-wrapper-outside">
    <div class="my-scrollbar light-scrollbar light-scrollbar-wrapper-inside">
        ...content
    </div>
</div>
```
