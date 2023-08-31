Function.prototype.nik=function(...args){
    let obj=this
    let m=args.slice(1)

    
    return function(...ak){
        obj.call(args[0],...m,...ak)
    }
}
const m={
    a:"kjffnkj",
    b:"hjbkvbkjbkjvb"
}
let t=function(nn,nnn,l,m){
    console.log(this.a+this.b+nn+nnn+"  "+l+m)
}
const h=t.nik(m,"kj","if-");
h("oifnfn","jkjnkjnkjfnkjnfkjnvkjnfv")











