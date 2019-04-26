import React, { Component } from "react";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { USER_FRAGMENT } from "../graphql/fragments";

import { Button, Modal, ModalFooter, ModalHeader } from "reactstrap";
import Dropzone from "react-dropzone";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import ModalBody from "reactstrap/lib/ModalBody";

const uploadFileMutation = gql`
  ${USER_FRAGMENT}

  mutation($file: Upload!) {
    uploadImage(file: $file) {
      ...profile
    }
  }
`;

export default class UploadAndCrop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      src: null,
      crop: {
        height: 200,
        minHeight: 200,
        aspect: 1 / 1,
        locked: true,
        x: 0,
        y: 0
      },
      modal: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  onSelectFile = e => {
    const reader = new FileReader();
    reader.addEventListener("load", () =>
      this.setState({ src: reader.result })
    );
    reader.readAsDataURL(e[0]);
  };

  onImageLoaded = (image, crop) => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = crop => {
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  render() {
    const { crop, src } = this.state;

    return (
      <div>
        <Button outline color="info" onClick={this.toggle}>
          Upload
        </Button>
        <Mutation
          mutation={uploadFileMutation}
          onCompleted={({ uploadImage: newUser }) => {
            this.props.userContext.updateUser(newUser);
          }}
        >
          {mutate => (
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle} />
              <ModalBody>
                {!src && (
                  <Dropzone
                    accept="image/*"
                    multiple={false}
                    onDropAccepted={file => {
                      this.onSelectFile(file);
                    }}
                    onDropRejected={() => {
                      console.error("File rejected");
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps()}
                        className="d-flex flex-column align-items-center justify-content-center rounded"
                        style={{
                          height: "5rem",
                          borderStyle: "dashed",
                          borderWidth: "1px"
                        }}
                      >
                        <input {...getInputProps()} />
                        <span>click or drag to insert picture</span>
                      </div>
                    )}
                  </Dropzone>
                )}
                {src && (
                  <div>
                    <ReactCrop
                      src={src}
                      crop={crop}
                      onImageLoaded={this.onImageLoaded}
                      onComplete={this.onCropComplete}
                      onChange={this.onCropChange}
                    />
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                {this.state.croppedImageUrl && (
                  <Button
                    onClick={async () => {
                      await this.makeClientCrop(this.state.crop);
                      var newFile = new File(
                        [
                          await fetch(this.state.croppedImageUrl).then(r =>
                            r.blob()
                          )
                        ],
                        "upload.png"
                      );
                      mutate({ variables: { file: [newFile] } });
                    }}
                  >
                    Upload!
                  </Button>
                )}{" "}
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          )}
        </Mutation>
      </div>
    );
  }
}
