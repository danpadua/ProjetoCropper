/**
 * Plugin Profile Cropper v.1.0
 * Using class 'profile-cropper' for call modal cropper image
 * Author: Danilo Oliveira
 */
var $fileSelected = false;

$(function () {
    // Tooltip
    $("[data-toggle=\"tooltip\"]").tooltip();
    if ($(".profile-cropper").length > 0) {
        var htmlContent = "" +
            "<div class=\"col-sm-12\">" +
                "<a href=\"javascript: ModalCropperImageProfile();\" class=\"avatar-view\" title=\"Alterar Imagem\">" +
                    "<img id=\"imgProfile\" src=\"img/picture2.jpg\" alt=\"Avatar\" width=\"215\" height=\"215\">" +
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
