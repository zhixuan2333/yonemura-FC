
function App() {

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>米村 ふぁんくらぶ 🤪 🤩 😎 </h1>
      <a href='/login'><div>ログイン</div></a>
      <div>みんな～^-^🥰</div> <div>は～いお待たせしたよ～ん😍</div>
      <div>やっとのおもいで完成させました！</div><div>みんなぜひ使ってみてね</div>
      <div dangerouslySetInnerHTML={{ __html: '<!-- TODO: ほんで、リリースする前に消してね admin, 🥰🤪🤩🤔 -->' }} />

    </div>
  )
}

export default App
