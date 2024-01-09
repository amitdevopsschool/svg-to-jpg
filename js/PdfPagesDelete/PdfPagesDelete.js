const { PDFDocument } = PDFLib;

let form = document.getElementById('form')
let inputElement = document.getElementById('file')

let selectedPages = []

let typedarray

form.addEventListener('submit',(e) => {
    e.preventDefault()

    //get the pages user selected in list 

    for (var option of document.getElementById("pages").options) {
        if (option.selected) {
            selectedPages.push(option.value);
        }
    }

    console.log(selectedPages);

    removePages(typedarray,selectedPages)
})

inputElement.onchange = function (event) {
    var file = event.target.files[0];

    // step 2: Read the file using file reader
            var fileReader = new FileReader();

            fileReader.onload = function () {
                //Step 4:turn array buffer into typed array
                typedarray = new Uint8Array(this.result);

                //Step 5:pdfjs should be able to read this
                const loadingTask = pdfjsLib.getDocument(typedarray);

                loadingTask.promise.then(async (pdf) => {

                    // The document is loaded here...

                    let pages = []

                    for(let i=0;i<pdf.numPages;i++){
                        pages.push(i)
                    }


                    let html = `

                    <label for="select pages">Select Pages of PDF You want to Delete:</label>
                    <select id="pages" class="form-control" name="sites-list" size="${
                        pdf.numPages
                    }" multiple>
                    
                    ${appendOption(pages)}

                    </select>`

                    // add it to dom

                    document.getElementById('result').innerHTML = html

                    document.getElementById('result').style.display = "block"

                });
            };
            //Step 3:Read the file as ArrayBuffer
            fileReader.readAsArrayBuffer(file);
        };

        function appendOption(pages){
            let html =''

            pages.forEach(page =>{
                html+= `

                <option value="${page+1}">${page+1}</option>

                `
            });

            return html
        }


        window.onmousedown = function (e) {
            var el = e.target;
            if (
                el.tagName.toLowerCase() == "option" &&
                el.parentNode.hasAttribute("multiple")
            ){
                e.preventDefault();

                //toggle selection
                if (el.hasAttribute("selected")) el.removeAttribute("selected");
                else el.setAttribute("selected", "");

                // hack to correct buggy behavior
                var select = el.parentNode.cloneNode(true);
                el.parentNode.parentNode.replaceChild(select, el.parentNode);
            }
        };

 
 async function removePages(typedarray,selectedPages){

    const pdfDoc = await PDFDocument.load(typedarray);
    //Get the first page of the document
    
    selectedPages.forEach((page,index) => {
        pdfDoc.removePage((page - 1) - index);
    });

    const pdfBytes = await pdfDoc.save();

    //Trigger the browser to download the PDF document
    download(pdfBytes, "Download.pdf", "application/pdf");

 }
