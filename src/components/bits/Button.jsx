function Button({ children, className = '', ...props }) {
  return (
    <button
      className={
        `inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium ` +
        `bg-primary-500 text-white shadow-soft transition-colors hover:bg-primary-600 focus:outline-none ` +
        `focus-visible:ring-2 focus-visible:ring-primary-500/40 ` +
        className
      }
      {...props}
    >
      {children}
    </button>
  )
}

export default Button


