export const isRefElementVisible = (ref: React.MutableRefObject<HTMLInputElement>) => {
    const rect = ref.current?.getBoundingClientRect()

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
}

export const scrollToBottom = (ref: React.MutableRefObject<HTMLInputElement>, smooth?: boolean) => {
    smooth ? ref.current?.scrollIntoView({ behavior: "smooth" }) : document.querySelector('.tinder__chat')?.scrollTo(0, document.querySelector('.tinder__chat')?.scrollHeight || 0);
}