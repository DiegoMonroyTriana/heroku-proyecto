export function FormReq () {
  //function to add input to form
  function addInput (name, type, value) {
    const input = document.createElement('input')
    input.setAttribute('name', name)
    input.setAttribute('type', type)
    input.setAttribute('value', value)
    return input
  }
  //function to add textarea to form
  function addTextarea (name, value) {
    const textarea = document.createElement('textarea')
    textarea.setAttribute('name', name)
    textarea.setAttribute('value', value)
    return textarea
  }


  return (
    <div className = 'w-full p-40 '>
    <section className='m-4 p-4 backdrop-blur-sm bg-white/60 rounded-lg'>
    <img src = '/letras.png' className = 'w-44'/>
    <form id = 'frm' >
      <p className = 'text-3xl font-extrabold p-3'>Requisición</p>
      <input className = ' rounded-md p-2 border' id = 'field-clone'/>
      <button className = 'w-8 h-8 bg-slate-700 hover:bg-slate-400 text-white font-extrabold text-4xl rounded-full ' onClick = {(e)=>{e.preventDefault(); addInput(); addTextarea()}}>+</button>
    </form> 
    </section>
    </div>
  )
}