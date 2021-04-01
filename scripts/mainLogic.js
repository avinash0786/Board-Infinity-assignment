console.log("Main js connected")

function submitTask(){
    console.log("Submitting task");
    const name=$("#taskName").val();
    const desc=$("#taskDesc").val();
    const creator=$("#taskCreator").val();
    const duration=$("#duration").val();
    console.log(name,desc,creator,duration)
    const wait=$("#wait");
    const subm=$("#submit");
    subm.hide();
    wait.show();
    const sending={
        name:name,
        desc:desc,
        creator:creator,
        duration:duration
    }
    fetch('/addTask',{
        method: 'POST',
        headers: {
             'Content-Type': 'application/json',
        },
        body: JSON.stringify(sending)
    }).then(d=>{
        subm.show();
        wait.hide();
        listData()  //updating data
        console.log("added data")
    }).catch(e=>{
        console.log("Error approve")
    })
}

async function listData(){
    console.log("Listing data...")
    let slect=$("#taskLists")
    slect.empty();
    slect.append(`
                    <h1>List of Active Tasks <button onclick="listData()" class="btn btn-primary float-right" data-toggle="tooltip" type="button" style="margin-top: 7px;padding: 5px 5px;padding-right: 5px;width: 10%;height: 10%;background: rgba(222,230,238,0.92);" title="Refesh Data"><i class="fa fa-refresh" style="font-size: 22px;color: var(--green);width: 21.8625px;"></i></button></h1>
    `)
    var returned=await fetch("/listTasks")
    returned.json()
        .then(data=>{
            console.log("data recieved")
            console.log("Data lenght "+data.length)
            if (data.length==0){
                slect.append(`<p style="text-align: center"><strong >NO ACTIVE TASK TO SHOW</strong></p>`)
            }
            for (let i = 0; i < data.length; i++) {

                slect.append(`<div class="shadow" style="height: fit-content;background: rgba(238,238,238,0.65);border-radius: 15px;padding: 7px;width: 100%;margin-bottom: 6px;">
                    <p style="margin-bottom: 7px;"></p>
                    <div class="d-flex" style="height: fit-content;background: rgba(177,158,160,0);">
                        <div style="height: fit-content;background: rgba(184,228,141,0);width: 76%;">
                            <p style="margin-bottom: 1%;font-size: 18px;">Task Name:&nbsp;<strong>${data[i].taskName}</strong></p>
                            <p style="margin-bottom: -1%;font-size: 18px;">Task Description:&nbsp;</p><strong>${data[i].taskDesc}</strong>
                            <p style="margin-bottom: 1%;font-size: 18px;">Created At:&nbsp;<strong>${new Date(data[i].createdAt).toDateString()+" "+new Date(data[i].createdAt).toLocaleTimeString()}</strong>&nbsp;</p>
                            <p style="margin-bottom: 1%;font-size: 18px;">Expires At:&nbsp;<strong>${new Date(data[i].expireAt).toDateString()+" "+new Date(data[i].expireAt).toLocaleTimeString()}</strong>&nbsp;</p>
                        </div>
                        <div style="background: rgba(199,213,184,0);width: 26%;"><i class="fa fa-clock-o" style="margin: 0 auto;font-size: 61px;color: rgb(74,147,16);margin-right: 1px;margin-top: 8%;margin-left: 34%;"></i>
                            <p class="text-center" style="margin-bottom: -4px;"><strong>${data[i].duration+" minutes"}</strong></p>
                            <p class="text-center"><strong style="color: var(--gray);">DURATION</strong></p>
                        </div>
                    </div>
                </div>`)
            }
        })
}

async function updateDropPen(month){
    console.log("Pending Drop Req")
    console.log("Month: "+month)
    // /landlord-transDropdown
    var returned=await fetch("/listTasks")
    returned.json()
        .then(d=>{
            console.log(d)
            let slect=$("#taskLists")
            console.log(d)
            if(d.load.length>0)
            {
                $("#infoPenMonth").text("Showing Pending transactions of month: "+d.monName)
                slect.empty();
                console.log("Success")
                console.log("Success")
                d.load.forEach(dis=>{
                    slect.append(`
                <tr style="height: 12px;font-size: 16px;"><td style="padding: 0px;height: 12px;width: 24%;">TID ${dis.tid }</td>
                <td style="padding: 0px;height: 12px;width: 40%;">${dis.NameMatch[0].fname}</td>
                <td style="padding: 0px;height: 12px;">
                <i class="fa fa-rupee" style="color: rgb(25,119,187);border-color: rgb(13,67,171);margin-left: 0px;">
                </i> ${dis.amount} <i class="fa fa-question-circle float-right" data-target="#transmodel" data-toggle="modal" onclick='getTransInfo(${dis.tid},this)' style="color: rgb(208,37,37);padding-top: 2px;margin-top: 2px; cursor: pointer;"></i>
                </td></tr>`)
                })

            }
            else {
                slect.empty();
                $("#penCount").text("0 %")
                $("#infoPenMonth").text("Showing Pending transactions of month: "+d.monName)
                slect.append(`<tr style="height: 12px;font-size: 16px;">
                                <td colspan="3" align="center">No recieved Transactions</td>
                            </tr>`)
            }
        }).catch(e=>{
        console.log("Error")
        console.log(e)
    })
}
