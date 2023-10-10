import "../../scss/FileActions.scss"

type Props = {
    onSave: () => void;
    onLoad: () => void;
    fileInputRef: any;
    onFileChange: (event: any) => void;
}


export default function FileActions({ onSave, onLoad, fileInputRef, onFileChange }: Props) {
    return(
            <div className="button-container">
                <div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={onFileChange}
                    />
                    <button
                        className="action-button left-action-button"
                        onClick={onSave}
                    >
                        <img
                            src="https://icons.iconarchive.com/icons/ionic/ionicons/72/save-sharp-icon.png"
                            alt={"Save"}
                            width={18}
                            height={18}
                        />
                    </button>
                </div>

                <button
                    className="action-button right-action-button"
                    onClick={onLoad}
                >
                    <img
                        src="https://icons.iconarchive.com/icons/pictogrammers/material-folder/72/folder-open-icon.png"
                        alt={"Load"}
                        width={20}
                        height={20}
                    />
                </button>
            </div>
    );
}
