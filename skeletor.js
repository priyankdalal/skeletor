/*
@@
@@Skeletor HTML generetor
@@
@@Author Priyank Kumar
@@
*/

var Skeletor={
    createBones:function(input,level=0){
        var op=[" ", "*",".","#"],
            bone=[];
        if(level<op.length){
            let a=input.split(op[level]);
            if(level==0){
                for(let i in a){
                    a[i]=Skeletor.createBones(a[i],level+1);
                }
            }else if(level==1){
                let b={count:1};
                b.node=Skeletor.createBones(a[0],level+1);
                if(a.length>1) b.count=parseInt(a[1]);
                a=b;
            }else if(level==2){
                let b={classess:[]};
                if(a.length>1){
                    if(!a[0]) a[0]="div";
                    b.tag=a[0];
                    let c={};
                    for(let i in a){
                        if(i==0) continue;
                        c=Skeletor.createBones(a[i],level+1);
                        if(c.hasOwnProperty("id"))
                            b.id=c.id;
                        b.classess.push(c.tag);
                    }
                    return b;
                }else if(a.length<2){
                    if(!a[0]) b.tag="div";
                    else {
                        b=Skeletor.createBones(a[0],level+1);
                    }
                }
                return b;
            }else if(level==3){
                if(a.length<2)
                    return {tag:a[0]}
                else{
                    if(!a[0]) a[0]="div";
                    return {tag:a[0],id:a[1]};
                }
            }
            bone=a;
        }else
            return {tag:input};
        return bone;
    },
    createJoints:function(bones,spaces,level=0){
        var html="",
            space=" ".repeat((level*4)+spaces);
        if(level<bones.length){
            html+=space+ "<"+ bones[level].node.tag;
            if(bones[level].node.hasOwnProperty("classess") && bones[level].node.classess.length>0){
                html+=" class=\"";
                for(let i in bones[level].node.classess){
                    if(i>0) html+=" ";
                    html+=bones[level].node.classess[i];
                }
                html+="\"";
            }
            if(bones[level].node.hasOwnProperty("id"))
                html+=" id=\""+ bones[level].node.id+ "\"";
            html+=">\n";
            html+=Skeletor.createJoints(bones,spaces,level+1);
            html+=space+ "</"+ bones[level].node.tag+ ">\n";
            html=html.repeat(bones[level].count);
            if(level==0) html=html.trimRight()
        }
        return html;
    },
    createSkeleton:function(input){
        input=input.trimRight();
        let spaces=input.length;
        input=input.trimLeft();
        spaces-=input.length;
        input=input.replace(/\s{2,}/g," ")
            .replace(/ \>\ /g," ")
            .replace(/ \+\ /g,"+")
            .replace(/ \*\ /g,"*");
        let bones=Skeletor.createBones(input.trim());
        let joints=Skeletor.createJoints(bones,spaces);
        return joints;
    }
};
