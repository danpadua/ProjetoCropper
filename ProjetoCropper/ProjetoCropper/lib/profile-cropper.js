/**
 * Plugin Profile Cropper v.1.0
 * Using class 'profile-cropper' for call modal cropper image
 * Author: Danilo Oliveira
 */
var $fileSelected = false;

$(function () {
    // Tooltip
    $("[data-toggle=\"tooltip\"]").tooltip();
    var photoImg = $("#imgProfile").attr("src").split(",")[1];

    var photoDefault = photoImg ? photoImg : "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";
    
    if ($(".profile-cropper").length > 0) {
        var htmlContent = "" +
            "<div class=\"col-sm-12\">" +
                "<a href=\"javascript: ModalCropperImageProfile();\" class=\"avatar-view\" title=\"Clique na imagem para alterá-la\">" +
                    "<img id=\"imgProfile\" src=\"data:image/jpeg;base64,"+photoDefault+"\" alt=\"Foto\" width=\"180\" height=\"180\">" +
                "</a>" +
            "</div>" +
            "<div class=\"modal fade\" id=\"avatar-modal\" aria-hidden=\"true\" aria-labelledby=\"avatar-modal-label\" role=\"dialog\" tabindex=\"-1\">" +
                "<div class=\"modal-dialog modal-lg\">" +
                    "<div class=\"modal-content\">" +
                        "<div class=\"modal-header\">" +
                            "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>" +
                            "<h4 class=\"modal-title\" id=\"getCroppedCanvasTitle\">Edite a sua Imagem</h4>" +
                        "</div>" +
                        "<div class=\"container\">" +
                            "<div class=\"col-md-6\">" +
                                "<div class=\"img-container\">" +
                                    "<img id=\"image\" src=\"\" alt=\"Picture\">" +
                                "</div>" +
                            "</div>" +
                            "<div class=\"col-md-6\">" +
                                "<div class=\"docs-preview clearfix\">" +
                                    "<div class=\"row\">" +
                                        "<div class=\"img-preview preview-lg\"></div>" +
                                    "</div>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                        "<div class=\"container\">" +
                            "<div class=\"col-md-9 docs-buttons\">" +
                                "<div class=\"btn-group\">" +
                                    "<label class=\"btn btn-primary btn-upload\" for=\"inputImage\" title=\"Carregar arquivo\">" +
                                        "<input type=\"file\" class=\"sr-only\" id=\"inputImage\" name=\"file\" accept=\"image/*\"> " +
                                        "<span class=\"docs-tooltip\" data-toggle=\"tooltip\" title=\"Escolher Imagem\">" +
                                            "<span class=\"fa fa-upload\"> Escolher Imagem</span>" +
                                        "</span>" +
                                    "</label>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "<div class=\"modal-footer\">" +
                        "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Fechar</button>" +
                        "<a class=\"btn btn-primary\" id=\"saveImage\" data-method=\"getCroppedCanvas\" href=\"javascript: void(0);\">Salvar</a>" +
                    "</div>" +
                "</div>" +
            "</div>" +
        "</div>";
        $(".profile-cropper").html(htmlContent);
    };
});

function ModalCropperImageProfile() {
    var $image = $("#image");
    var $dataX = $("#dataX");
    var $dataY = $("#dataY");
    var $dataHeight = $("#dataHeight");
    var $dataWidth = $("#dataWidth");
    var $dataRotate = $("#dataRotate");
    var $dataScaleX = $("#dataScaleX");
    var $dataScaleY = $("#dataScaleY");
    var options = {
        aspectRatio: 1,
        preview: ".img-preview",
        crop: function (e) {
            $dataX.val(Math.round(e.x));
            $dataY.val(Math.round(e.y));
            $dataHeight.val(Math.round(e.height));
            $dataWidth.val(Math.round(e.width));
            $dataRotate.val(e.rotate);
            $dataScaleX.val(e.scaleX);
            $dataScaleY.val(e.scaleY);
        }
    };

    //Verifica se usuário escolheu a imagem
    if (!$fileSelected) $(".img-container").css("display", "none");

    //Seta imagem no modal de edição
    $("#image").attr("src", $("#imgProfile").attr("src"));

    // Cropper
    ConfiguringImage(options, $image);

    // Botões
    ConfiguringButtons();

    // Opções
    $(".docs-toggles").on("change", "input", function () {
        if (!$image.data("cropper")) return;

        options["aspectRatio"] = 1;
        $image.cropper("destroy").cropper(options);
    });

    //Salva edição da imagem
    SaveCropper($image);

    // Movimenta a imagem pelas setas do teclado
    ConfiguringMoveKey($image);

    // Importa imagem
    ImportImageLocal($image);

    //Abre modal de edição
    $("#avatar-modal").modal("show");
};

function ConfiguringImage(options, $image) {
    $image.on({
        'build.cropper': function (e) { },
        'built.cropper': function (e) { },
        'cropstart.cropper': function (e) { },
        'cropmove.cropper': function (e) { },
        'cropend.cropper': function (e) { },
        'crop.cropper': function (e) { },
        'zoom.cropper': function (e) { }
    }).cropper(options);
}
function ConfiguringButtons() {
    if (!$.isFunction(document.createElement("canvas").getContext))
        $("button[data-method=\"getCroppedCanvas\"]").prop("disabled", true);

    if (typeof document.createElement("cropper").style.transition === "undefined") {
        $("button[data-method=\"rotate\"]").prop("disabled", true);
        $("button[data-method=\"scale\"]").prop("disabled", true);
    }
}
function SaveCropper($image) {
    $("#saveImage").on("click", function () {
        var $this = $(this);
        var data = $this.data();
        var $target;
        var result;

        if ($this.prop("disabled") || $this.hasClass("disabled")) {
            return;
        }

        if ($image.data("cropper") && data.method) {
            data = $.extend({}, data); // Clone a new one

            if (typeof data.target !== "undefined") {
                $target = $(data.target);

                if (typeof data.option === "undefined") {
                    try {
                        data.option = JSON.parse($target.val());
                    } catch (e) {
                        console.log(e.message);
                    }
                }
            }

            result = $image.cropper(data.method, data.option, data.secondOption);
            $("#imgProfile").attr("src", result.toDataURL());
            $(".modal").modal("hide");
        }
    });
}
function ImportImageLocal($image) {
    var $inputImage = $("#inputImage");
    var url = window.URL || window.webkitURL;
    var blobUrl;

    if (url) {
        $inputImage.change(function () {
            $(".img-container").css("display", "");
            $fileSelected = true;
            var files = this.files;
            var file;

            if (!$image.data("cropper")) {
                return;
            }

            if (files && files.length) {
                file = files[0];

                if (/^image\/\w+$/.test(file.type)) {
                    blobUrl = url.createObjectURL(file);
                    $image.one("built.cropper", function () {
                        // Revoke when load complete
                        url.revokeObjectURL(blobUrl);
                    }).cropper("reset").cropper("replace", blobUrl);
                    $inputImage.val("");
                } else {
                    window.alert("Favor escolha uma imagem.");
                }
            }
        });
    } else {
        $inputImage.prop("disabled", true).parent().addClass("disabled");
    }
}
function ConfiguringMoveKey($image) {
    $(document.body).on("keydown", function (e) {
        if (!$image.data("cropper") || this.scrollTop > 300) {
            return;
        }
        switch (e.which) {
            case 37:
                e.preventDefault();
                $image.cropper("move", -1, 0);
                break;
            case 38:
                e.preventDefault();
                $image.cropper("move", 0, -1);
                break;
            case 39:
                e.preventDefault();
                $image.cropper("move", 1, 0);
                break;
            case 40:
                e.preventDefault();
                $image.cropper("move", 0, 1);
                break;
        }
    });
}
