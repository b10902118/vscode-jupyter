// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
    Breakpoint,
    BreakpointsChangeEvent,
    CancellationToken,
    CompletionItemProvider,
    DebugAdapterTrackerFactory,
    DebugConfiguration,
    DebugConfigurationProvider,
    DebugConsole,
    DebugSession,
    DebugSessionCustomEvent,
    DecorationRenderOptions,
    Disposable,
    DocumentSelector,
    Event,
    InputBox,
    InputBoxOptions,
    MessageItem,
    MessageOptions,
    OpenDialogOptions,
    OutputChannel,
    Progress,
    ProgressOptions,
    QuickPick,
    QuickPickItem,
    QuickPickOptions,
    SaveDialogOptions,
    StatusBarAlignment,
    StatusBarItem,
    Terminal,
    TerminalOptions,
    TextDocument,
    TextDocumentChangeEvent,
    TextDocumentShowOptions,
    TextEditor,
    TextEditorDecorationType,
    TextEditorEdit,
    TextEditorOptionsChangeEvent,
    TextEditorSelectionChangeEvent,
    TextEditorViewColumnChangeEvent,
    TreeView,
    TreeViewOptions,
    UIKind,
    Uri,
    ViewColumn,
    WebviewPanel as vscodeWebviewPanel,
    WebviewView as vscodeWebviewView,
    WindowState,
    WorkspaceEdit,
    WorkspaceFolder,
    WorkspaceFolderPickOptions,
    NotebookDocument,
    NotebookEditor,
    NotebookEditorSelectionChangeEvent,
    NotebookDocumentContentOptions,
    NotebookRendererScript,
    NotebookController,
    NotebookCell,
    NotebookSerializer,
    NotebookData,
    NotebookDocumentShowOptions,
    ColorTheme,
    NotebookCellExecutionStateChangeEvent
} from 'vscode';

import { IAsyncDisposable, Resource } from '../types';
import { ICommandNameArgumentTypeMapping } from '../../../commands';

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/unified-signatures */

export const IApplicationShell = Symbol('IApplicationShell');
export interface IApplicationShell {
    readonly activeColorTheme: ColorTheme;
    /**
     * An [event](#Event) which fires when the focus state of the current window
     * changes. The value of the event represents whether the window is focused.
     */
    readonly onDidChangeWindowState: Event<WindowState>;

    showInformationMessage(message: string, ...items: string[]): Thenable<string | undefined>;

    /**
     * Show an information message to users. Optionally provide an array of items which will be presented as
     * clickable buttons.
     *
     * @param message The message to show.
     * @param options Configures the behaviour of the message.
     * @param items A set of items that will be rendered as actions in the message.
     * @return A thenable that resolves to the selected item or `undefined` when being dismissed.
     */
    showInformationMessage(message: string, options: MessageOptions, ...items: string[]): Thenable<string | undefined>;

    /**
     * Show an information message.
     *
     * @see [showInformationMessage](#window.showInformationMessage)
     *
     * @param message The message to show.
     * @param items A set of items that will be rendered as actions in the message.
     * @return A thenable that resolves to the selected item or `undefined` when being dismissed.
     */
    showInformationMessage<T extends MessageItem>(message: string, ...items: T[]): Thenable<T | undefined>;

    /**
     * Show an information message.
     *
     * @see [showInformationMessage](#window.showInformationMessage)
     *
     * @param message The message to show.
     * @param options Configures the behaviour of the message.
     * @param items A set of items that will be rendered as actions in the message.
     * @return A thenable that resolves to the selected item or `undefined` when being dismissed.
     */
    showInformationMessage<T extends MessageItem>(
        message: string,
        options: MessageOptions,
        ...items: T[]
    ): Thenable<T | undefined>;

    /**
     * Show a warning message.
     *
     * @see [showInformationMessage](#window.showInformationMessage)
     *
     * @param message The message to show.
     * @param items A set of items that will be rendered as actions in the message.
     * @return A thenable that resolves to the selected item or `undefined` when being dismissed.
     */
    showWarningMessage(message: string, ...items: string[]): Thenable<string | undefined>;

    /**
     * Show a warning message.
     *
     * @see [showInformationMessage](#window.showInformationMessage)
     *
     * @param message The message to show.
     * @param options Configures the behaviour of the message.
     * @param items A set of items that will be rendered as actions in the message.
     * @return A thenable that resolves to the selected item or `undefined` when being dismissed.
     */
    showWarningMessage(message: string, options: MessageOptions, ...items: string[]): Thenable<string | undefined>;

    /**
     * Show a warning message.
     *
     * @see [showInformationMessage](#window.showInformationMessage)
     *
     * @param message The message to show.
     * @param items A set of items that will be rendered as actions in the message.
     * @return A thenable that resolves to the selected item or `undefined` when being dismissed.
     */
    showWarningMessage<T extends MessageItem>(message: string, ...items: T[]): Thenable<T | undefined>;

    /**
     * Show a warning message.
     *
     * @see [showInformationMessage](#window.showInformationMessage)
     *
     * @param message The message to show.
     * @param options Configures the behaviour of the message.
     * @param items A set of items that will be rendered as actions in the message.
     * @return A thenable that resolves to the selected item or `undefined` when being dismissed.
     */
    showWarningMessage<T extends MessageItem>(
        message: string,
        options: MessageOptions,
        ...items: T[]
    ): Thenable<T | undefined>;

    /**
     * Show an error message.
     *
     * @see [showInformationMessage](#window.showInformationMessage)
     *
     * @param message The message to show.
     * @param items A set of items that will be rendered as actions in the message.
     * @return A thenable that resolves to the selected item or `undefined` when being dismissed.
     */
    showErrorMessage(message: string, ...items: string[]): Thenable<string | undefined>;

    /**
     * Show an error message.
     *
     * @see [showInformationMessage](#window.showInformationMessage)
     *
     * @param message The message to show.
     * @param options Configures the behaviour of the message.
     * @param items A set of items that will be rendered as actions in the message.
     * @return A thenable that resolves to the selected item or `undefined` when being dismissed.
     */
    showErrorMessage(message: string, options: MessageOptions, ...items: string[]): Thenable<string | undefined>;

    /**
     * Show an error message.
     *
     * @see [showInformationMessage](#window.showInformationMessage)
     *
     * @param message The message to show.
     * @param items A set of items that will be rendered as actions in the message.
     * @return A thenable that resolves to the selected item or `undefined` when being dismissed.
     */
    showErrorMessage<T extends MessageItem>(message: string, ...items: T[]): Thenable<T | undefined>;

    /**
     * Show an error message.
     *
     * @see [showInformationMessage](#window.showInformationMessage)
     *
     * @param message The message to show.
     * @param options Configures the behaviour of the message.
     * @param items A set of items that will be rendered as actions in the message.
     * @return A thenable that resolves to the selected item or `undefined` when being dismissed.
     */
    showErrorMessage<T extends MessageItem>(
        message: string,
        options: MessageOptions,
        ...items: T[]
    ): Thenable<T | undefined>;

    /**
     * Shows a selection list.
     *
     * @param items An array of strings, or a promise that resolves to an array of strings.
     * @param options Configures the behavior of the selection list.
     * @param token A token that can be used to signal cancellation.
     * @return A promise that resolves to the selection or `undefined`.
     */
    showQuickPick(
        items: string[] | Thenable<string[]>,
        options?: QuickPickOptions,
        token?: CancellationToken
    ): Thenable<string | undefined>;

    /**
     * Shows a selection list.
     *
     * @param items An array of items, or a promise that resolves to an array of items.
     * @param options Configures the behavior of the selection list.
     * @param token A token that can be used to signal cancellation.
     * @return A promise that resolves to the selected item or `undefined`.
     */
    showQuickPick<T extends QuickPickItem>(
        items: T[] | Thenable<T[]>,
        options?: QuickPickOptions,
        token?: CancellationToken
    ): Thenable<T | undefined>;

    /**
     * Shows a file open dialog to the user which allows to select a file
     * for opening-purposes.
     *
     * @param options Options that control the dialog.
     * @returns A promise that resolves to the selected resources or `undefined`.
     */
    showOpenDialog(options: OpenDialogOptions): Thenable<Uri[] | undefined>;

    /**
     * Shows a file save dialog to the user which allows to select a file
     * for saving-purposes.
     *
     * @param options Options that control the dialog.
     * @returns A promise that resolves to the selected resource or `undefined`.
     */
    showSaveDialog(options: SaveDialogOptions): Thenable<Uri | undefined>;

    /**
     * Opens an input box to ask the user for input.
     *
     * The returned value will be `undefined` if the input box was canceled (e.g. pressing ESC). Otherwise the
     * returned value will be the string typed by the user or an empty string if the user did not type
     * anything but dismissed the input box with OK.
     *
     * @param options Configures the behavior of the input box.
     * @param token A token that can be used to signal cancellation.
     * @return A promise that resolves to a string the user provided or to `undefined` in case of dismissal.
     */
    showInputBox(options?: InputBoxOptions, token?: CancellationToken): Thenable<string | undefined>;

    /**
     * Creates a [QuickPick](#QuickPick) to let the user pick an item from a list
     * of items of type T.
     *
     * Note that in many cases the more convenient [window.showQuickPick](#window.showQuickPick)
     * is easier to use. [window.createQuickPick](#window.createQuickPick) should be used
     * when [window.showQuickPick](#window.showQuickPick) does not offer the required flexibility.
     *
     * @return A new [QuickPick](#QuickPick).
     */
    createQuickPick<T extends QuickPickItem>(): QuickPick<T>;

    /**
     * Creates a [InputBox](#InputBox) to let the user enter some text input.
     *
     * Note that in many cases the more convenient [window.showInputBox](#window.showInputBox)
     * is easier to use. [window.createInputBox](#window.createInputBox) should be used
     * when [window.showInputBox](#window.showInputBox) does not offer the required flexibility.
     *
     * @return A new [InputBox](#InputBox).
     */
    createInputBox(): InputBox;
    /**
     * Opens URL in a default browser.
     *
     * @param url Url to open.
     */
    openUrl(url: string): void;

    /**
     * Set a message to the status bar. This is a short hand for the more powerful
     * status bar [items](#window.createStatusBarItem).
     *
     * @param text The message to show, supports icon substitution as in status bar [items](#StatusBarItem.text).
     * @param hideAfterTimeout Timeout in milliseconds after which the message will be disposed.
     * @return A disposable which hides the status bar message.
     */
    setStatusBarMessage(text: string, hideAfterTimeout: number): Disposable;

    /**
     * Set a message to the status bar. This is a short hand for the more powerful
     * status bar [items](#window.createStatusBarItem).
     *
     * @param text The message to show, supports icon substitution as in status bar [items](#StatusBarItem.text).
     * @param hideWhenDone Thenable on which completion (resolve or reject) the message will be disposed.
     * @return A disposable which hides the status bar message.
     */
    setStatusBarMessage(text: string, hideWhenDone: Thenable<any>): Disposable;

    /**
     * Set a message to the status bar. This is a short hand for the more powerful
     * status bar [items](#window.createStatusBarItem).
     *
     * *Note* that status bar messages stack and that they must be disposed when no
     * longer used.
     *
     * @param text The message to show, supports icon substitution as in status bar [items](#StatusBarItem.text).
     * @return A disposable which hides the status bar message.
     */
    setStatusBarMessage(text: string): Disposable;

    /**
     * Creates a status bar [item](#StatusBarItem).
     *
     * @param alignment The alignment of the item.
     * @param priority The priority of the item. Higher values mean the item should be shown more to the left.
     * @return A new status bar item.
     */
    createStatusBarItem(alignment?: StatusBarAlignment, priority?: number): StatusBarItem;
    /**
     * Shows a selection list of [workspace folders](#workspace.workspaceFolders) to pick from.
     * Returns `undefined` if no folder is open.
     *
     * @param options Configures the behavior of the workspace folder list.
     * @return A promise that resolves to the workspace folder or `undefined`.
     */
    showWorkspaceFolderPick(options?: WorkspaceFolderPickOptions): Thenable<WorkspaceFolder | undefined>;

    /**
     * Show progress in the editor. Progress is shown while running the given callback
     * and while the promise it returned isn't resolved nor rejected. The location at which
     * progress should show (and other details) is defined via the passed [`ProgressOptions`](#ProgressOptions).
     *
     * @param task A callback returning a promise. Progress state can be reported with
     * the provided [progress](#Progress)-object.
     *
     * To report discrete progress, use `increment` to indicate how much work has been completed. Each call with
     * a `increment` value will be summed up and reflected as overall progress until 100% is reached (a value of
     * e.g. `10` accounts for `10%` of work done).
     * Note that currently only `ProgressLocation.Notification` is capable of showing discrete progress.
     *
     * To monitor if the operation has been cancelled by the user, use the provided [`CancellationToken`](#CancellationToken).
     * Note that currently only `ProgressLocation.Notification` is supporting to show a cancel button to cancel the
     * long running operation.
     *
     * @return The thenable the task-callback returned.
     */
    withProgress<R>(
        options: ProgressOptions,
        task: (progress: Progress<{ message?: string; increment?: number }>, token: CancellationToken) => Thenable<R>
    ): Thenable<R>;

    /**
     * Show progress in the status bar with a custom icon instead of the default spinner.
     * Progress is shown while running the given callback and while the promise it returned isn't resolved nor rejected.
     * At the moment, progress can only be displayed in the status bar when using this method. If you want to
     * display it elsewhere, use `withProgress`.
     *
     * @param icon A valid Octicon.
     *
     * @param task A callback returning a promise. Progress state can be reported with
     * the provided [progress](#Progress)-object.
     *
     * To report discrete progress, use `increment` to indicate how much work has been completed. Each call with
     * a `increment` value will be summed up and reflected as overall progress until 100% is reached (a value of
     * e.g. `10` accounts for `10%` of work done).
     * Note that currently only `ProgressLocation.Notification` is capable of showing discrete progress.
     *
     * To monitor if the operation has been cancelled by the user, use the provided [`CancellationToken`](#CancellationToken).
     * Note that currently only `ProgressLocation.Notification` is supporting to show a cancel button to cancel the
     * long running operation.
     *
     * @return The thenable the task-callback returned.
     */
    withProgressCustomIcon<R>(
        icon: string,
        task: (progress: Progress<{ message?: string; increment?: number }>, token: CancellationToken) => Thenable<R>
    ): Thenable<R>;

    /**
     * Create a [TreeView](#TreeView) for the view contributed using the extension point `views`.
     * @param viewId Id of the view contributed using the extension point `views`.
     * @param options Options for creating the [TreeView](#TreeView)
     * @returns a [TreeView](#TreeView).
     */
    createTreeView<T>(viewId: string, options: TreeViewOptions<T>): TreeView<T>;

    /**
     * Creates a new [output channel](#OutputChannel) with the given name.
     *
     * @param name Human-readable string which will be used to represent the channel in the UI.
     */
    createOutputChannel(name: string): OutputChannel;
}

export const ICommandManager = Symbol('ICommandManager');

export interface ICommandManager {
    /**
     * Registers a command that can be invoked via a keyboard shortcut,
     * a menu item, an action, or directly.
     *
     * Registering a command with an existing command identifier twice
     * will cause an error.
     *
     * @param command A unique identifier for the command.
     * @param callback A command handler function.
     * @param thisArg The `this` context used when invoking the handler function.
     * @return Disposable which unregisters this command on disposal.
     */
    registerCommand<E extends keyof ICommandNameArgumentTypeMapping, U extends ICommandNameArgumentTypeMapping[E]>(
        command: E,
        callback: (...args: U) => any,
        thisArg?: any
    ): Disposable;

    /**
     * Registers a text editor command that can be invoked via a keyboard shortcut,
     * a menu item, an action, or directly.
     *
     * Text editor commands are different from ordinary [commands](#commands.registerCommand) as
     * they only execute when there is an active editor when the command is called. Also, the
     * command handler of an editor command has access to the active editor and to an
     * [edit](#TextEditorEdit)-builder.
     *
     * @param command A unique identifier for the command.
     * @param callback A command handler function with access to an [editor](#TextEditor) and an [edit](#TextEditorEdit).
     * @param thisArg The `this` context used when invoking the handler function.
     * @return Disposable which unregisters this command on disposal.
     */
    registerTextEditorCommand(
        command: string,
        callback: (textEditor: TextEditor, edit: TextEditorEdit, ...args: any[]) => void,
        thisArg?: any
    ): Disposable;

    /**
     * Executes the command denoted by the given command identifier.
     *
     * * *Note 1:* When executing an editor command not all types are allowed to
     * be passed as arguments. Allowed are the primitive types `string`, `boolean`,
     * `number`, `undefined`, and `null`, as well as [`Position`](#Position), [`Range`](#Range), [`Uri`](#Uri) and [`Location`](#Location).
     * * *Note 2:* There are no restrictions when executing commands that have been contributed
     * by extensions.
     *
     * @param command Identifier of the command to execute.
     * @param rest Parameters passed to the command function.
     * @return A thenable that resolves to the returned value of the given command. `undefined` when
     * the command handler function doesn't return anything.
     */
    executeCommand<T, E extends keyof ICommandNameArgumentTypeMapping, U extends ICommandNameArgumentTypeMapping[E]>(
        command: E,
        ...rest: U
    ): Thenable<T>;

    /**
     * Retrieve the list of all available commands. Commands starting an underscore are
     * treated as internal commands.
     *
     * @param filterInternal Set `true` to not see internal commands (starting with an underscore)
     * @return Thenable that resolves to a list of command ids.
     */
    getCommands(filterInternal?: boolean): Thenable<string[]>;
}

export const IDocumentManager = Symbol('IDocumentManager');

export interface IDocumentManager {
    /**
     * All text documents currently known to the system.
     *
     * @readonly
     */
    readonly textDocuments: readonly TextDocument[];
    /**
     * The currently active editor or `undefined`. The active editor is the one
     * that currently has focus or, when none has focus, the one that has changed
     * input most recently.
     */
    readonly activeTextEditor: TextEditor | undefined;

    /**
     * The currently visible editors or an empty array.
     */
    readonly visibleTextEditors: readonly TextEditor[];

    /**
     * An [event](#Event) which fires when the [active editor](#window.activeTextEditor)
     * has changed. *Note* that the event also fires when the active editor changes
     * to `undefined`.
     */
    readonly onDidChangeActiveTextEditor: Event<TextEditor | undefined>;

    /**
     * An event that is emitted when a [text document](#TextDocument) is changed. This usually happens
     * when the [contents](#TextDocument.getText) changes but also when other things like the
     * [dirty](#TextDocument.isDirty)-state changes.
     */
    readonly onDidChangeTextDocument: Event<TextDocumentChangeEvent>;

    /**
     * An [event](#Event) which fires when the array of [visible editors](#window.visibleTextEditors)
     * has changed.
     */
    readonly onDidChangeVisibleTextEditors: Event<readonly TextEditor[]>;

    /**
     * An [event](#Event) which fires when the selection in an editor has changed.
     */
    readonly onDidChangeTextEditorSelection: Event<TextEditorSelectionChangeEvent>;

    /**
     * An [event](#Event) which fires when the options of an editor have changed.
     */
    readonly onDidChangeTextEditorOptions: Event<TextEditorOptionsChangeEvent>;

    /**
     * An [event](#Event) which fires when the view column of an editor has changed.
     */
    readonly onDidChangeTextEditorViewColumn: Event<TextEditorViewColumnChangeEvent>;

    /**
     * An event that is emitted when a [text document](#TextDocument) is opened.
     */
    readonly onDidOpenTextDocument: Event<TextDocument>;
    /**
     * An event that is emitted when a [text document](#TextDocument) is disposed.
     */
    readonly onDidCloseTextDocument: Event<TextDocument>;
    /**
     * An event that is emitted when a [text document](#TextDocument) is saved to disk.
     */
    readonly onDidSaveTextDocument: Event<TextDocument>;

    /**
     * Show the given document in a text editor. A [column](#ViewColumn) can be provided
     * to control where the editor is being shown. Might change the [active editor](#window.activeTextEditor).
     *
     * @param document A text document to be shown.
     * @param column A view column in which the [editor](#TextEditor) should be shown. The default is the [one](#ViewColumn.One), other values
     * are adjusted to be `Min(column, columnCount + 1)`, the [active](#ViewColumn.Active)-column is
     * not adjusted.
     * @param preserveFocus When `true` the editor will not take focus.
     * @return A promise that resolves to an [editor](#TextEditor).
     */
    showTextDocument(document: TextDocument, column?: ViewColumn, preserveFocus?: boolean): Thenable<TextEditor>;

    /**
     * Show the given document in a text editor. [Options](#TextDocumentShowOptions) can be provided
     * to control options of the editor is being shown. Might change the [active editor](#window.activeTextEditor).
     *
     * @param document A text document to be shown.
     * @param options [Editor options](#TextDocumentShowOptions) to configure the behavior of showing the [editor](#TextEditor).
     * @return A promise that resolves to an [editor](#TextEditor).
     */
    showTextDocument(document: TextDocument, options?: TextDocumentShowOptions): Thenable<TextEditor>;

    /**
     * A short-hand for `openTextDocument(uri).then(document => showTextDocument(document, options))`.
     *
     * @see [openTextDocument](#openTextDocument)
     *
     * @param uri A resource identifier.
     * @param options [Editor options](#TextDocumentShowOptions) to configure the behavior of showing the [editor](#TextEditor).
     * @return A promise that resolves to an [editor](#TextEditor).
     */
    showTextDocument(uri: Uri, options?: TextDocumentShowOptions): Thenable<TextEditor>;
    /**
     * Opens a document. Will return early if this document is already open. Otherwise
     * the document is loaded and the [didOpen](#workspace.onDidOpenTextDocument)-event fires.
     *
     * The document is denoted by an [uri](#Uri). Depending on the [scheme](#Uri.scheme) the
     * following rules apply:
     * * `file`-scheme: Open a file on disk, will be rejected if the file does not exist or cannot be loaded.
     * * `untitled`-scheme: A new file that should be saved on disk, e.g. `untitled:c:\frodo\new.js`. The language
     * will be derived from the file name.
     * * For all other schemes the registered text document content [providers](#TextDocumentContentProvider) are consulted.
     *
     * *Note* that the lifecycle of the returned document is owned by the editor and not by the extension. That means an
     * [`onDidClose`](#workspace.onDidCloseTextDocument)-event can occur at any time after opening it.
     *
     * @param uri Identifies the resource to open.
     * @return A promise that resolves to a [document](#TextDocument).
     */
    openTextDocument(uri: Uri): Thenable<TextDocument>;

    /**
     * A short-hand for `openTextDocument(Uri.file(fileName))`.
     *
     * @see [openTextDocument](#openTextDocument)
     * @param fileName A name of a file on disk.
     * @return A promise that resolves to a [document](#TextDocument).
     */
    openTextDocument(fileName: string): Thenable<TextDocument>;

    /**
     * Opens an untitled text document. The editor will prompt the user for a file
     * path when the document is to be saved. The `options` parameter allows to
     * specify the *language* and/or the *content* of the document.
     *
     * @param options Options to control how the document will be created.
     * @return A promise that resolves to a [document](#TextDocument).
     */
    openTextDocument(options?: { language?: string; content?: string }): Thenable<TextDocument>;
    /**
     * Make changes to one or many resources as defined by the given
     * [workspace edit](#WorkspaceEdit).
     *
     * When applying a workspace edit, the editor implements an 'all-or-nothing'-strategy,
     * that means failure to load one document or make changes to one document will cause
     * the edit to be rejected.
     *
     * @param edit A workspace edit.
     * @return A thenable that resolves when the edit could be applied.
     */
    applyEdit(edit: WorkspaceEdit): Thenable<boolean>;

    /**
     * Create a TextEditorDecorationType that can be used to add decorations to text editors.
     *
     * @param options Rendering options for the decoration type.
     * @return A new decoration type instance.
     */
    createTextEditorDecorationType(options: DecorationRenderOptions): TextEditorDecorationType;
}

export const IWorkspaceService = Symbol('IWorkspaceService');

export interface IWorkspaceService {
    /**
     * Computes where the working directory of a file is
     * @param resource
     */
    computeWorkingDirectory(resource: Resource): Promise<string>;
}

export const ITerminalManager = Symbol('ITerminalManager');

export interface ITerminalManager {
    /**
     * An [event](#Event) which fires when a terminal is disposed.
     */
    readonly onDidCloseTerminal: Event<Terminal>;
    /**
     * An [event](#Event) which fires when a terminal has been created, either through the
     * [createTerminal](#window.createTerminal) API or commands.
     */
    readonly onDidOpenTerminal: Event<Terminal>;
    /**
     * Creates a [Terminal](#Terminal). The cwd of the terminal will be the workspace directory
     * if it exists, regardless of whether an explicit customStartPath setting exists.
     *
     * @param options A TerminalOptions object describing the characteristics of the new terminal.
     * @return A new Terminal.
     */
    createTerminal(options: TerminalOptions): Terminal;
}

export const IDebugService = Symbol('IDebugManager');

export interface IDebugService {
    /**
     * The currently active [debug session](#DebugSession) or `undefined`. The active debug session is the one
     * represented by the debug action floating window or the one currently shown in the drop down menu of the debug action floating window.
     * If no debug session is active, the value is `undefined`.
     */
    readonly activeDebugSession: DebugSession | undefined;

    /**
     * The currently active [debug console](#DebugConsole).
     */
    readonly activeDebugConsole: DebugConsole;

    /**
     * List of breakpoints.
     */
    readonly breakpoints: readonly Breakpoint[];

    /**
     * An [event](#Event) which fires when the [active debug session](#debug.activeDebugSession)
     * has changed. *Note* that the event also fires when the active debug session changes
     * to `undefined`.
     */
    readonly onDidChangeActiveDebugSession: Event<DebugSession | undefined>;

    /**
     * An [event](#Event) which fires when a new [debug session](#DebugSession) has been started.
     */
    readonly onDidStartDebugSession: Event<DebugSession>;

    /**
     * An [event](#Event) which fires when a custom DAP event is received from the [debug session](#DebugSession).
     */
    readonly onDidReceiveDebugSessionCustomEvent: Event<DebugSessionCustomEvent>;

    /**
     * An [event](#Event) which fires when a [debug session](#DebugSession) has terminated.
     */
    readonly onDidTerminateDebugSession: Event<DebugSession>;

    /**
     * An [event](#Event) that is emitted when the set of breakpoints is added, removed, or changed.
     */
    readonly onDidChangeBreakpoints: Event<BreakpointsChangeEvent>;

    /**
     * Register a [debug configuration provider](#DebugConfigurationProvider) for a specific debug type.
     * More than one provider can be registered for the same type.
     *
     * @param type The debug type for which the provider is registered.
     * @param provider The [debug configuration provider](#DebugConfigurationProvider) to register.
     * @return A [disposable](#Disposable) that unregisters this provider when being disposed.
     */
    registerDebugConfigurationProvider(debugType: string, provider: DebugConfigurationProvider): Disposable;

    /**
     * Register a debug adapter tracker factory for the given debug type.
     *
     * @param debugType The debug type for which the factory is registered or '*' for matching all debug types.
     * @param factory The [debug adapter tracker factory](#DebugAdapterTrackerFactory) to register.
     * @return A [disposable](#Disposable) that unregisters this factory when being disposed.
     */
    registerDebugAdapterTrackerFactory(debugType: string, factory: DebugAdapterTrackerFactory): Disposable;

    /**
     * Start debugging by using either a named launch or named compound configuration,
     * or by directly passing a [DebugConfiguration](#DebugConfiguration).
     * The named configurations are looked up in '.vscode/launch.json' found in the given folder.
     * Before debugging starts, all unsaved files are saved and the launch configurations are brought up-to-date.
     * Folder specific variables used in the configuration (e.g. '${workspaceFolder}') are resolved against the given folder.
     * @param folder The [workspace folder](#WorkspaceFolder) for looking up named configurations and resolving variables or `undefined` for a non-folder setup.
     * @param nameOrConfiguration Either the name of a debug or compound configuration or a [DebugConfiguration](#DebugConfiguration) object.
     * @return A thenable that resolves when debugging could be successfully started.
     */
    startDebugging(
        folder: WorkspaceFolder | undefined,
        nameOrConfiguration: string | DebugConfiguration,
        parentSession?: DebugSession
    ): Thenable<boolean>;

    /**
     * Add breakpoints.
     * @param breakpoints The breakpoints to add.
     */
    addBreakpoints(breakpoints: Breakpoint[]): void;

    /**
     * Remove breakpoints.
     * @param breakpoints The breakpoints to remove.
     */
    removeBreakpoints(breakpoints: Breakpoint[]): void;
}

export const IApplicationEnvironment = Symbol('IApplicationEnvironment');
export interface IApplicationEnvironment {
    /**
     * The application name of the editor, like 'VS Code'.
     *
     * @readonly
     */
    readonly appName: string;

    /**
     * The extension name.
     *
     * @readonly
     */
    readonly extensionName: string;
    /**
     * The extension name.
     *
     * @readonly
     */
    readonly extensionVersion: string;

    /**
     * The application root folder from which the editor is running.
     *
     * @readonly
     */
    readonly appRoot: string;

    /**
     * Represents the preferred user-language, like `de-CH`, `fr`, or `en-US`.
     *
     * @readonly
     */
    readonly language: string;

    /**
     * A unique identifier for the computer.
     *
     * @readonly
     */
    readonly machineId: string;

    /**
     * A unique identifier for the current session.
     * Changes each time the editor is started.
     *
     * @readonly
     */
    readonly sessionId: string;
    /**
     * Contents of `package.json` as a JSON object.
     *
     * @type {any}
     * @memberof IApplicationEnvironment
     */
    readonly packageJson: any;
    /**
     * Gets the full path to the user settings file. (may or may not exist).
     *
     * @type {string}
     * @memberof IApplicationShell
     */
    readonly userSettingsFile: Uri | undefined;
    /**
     * Gets the full path to the user custom keybindings file. (may or may not exist).
     *
     * @type {string}
     * @memberof IApplicationShell
     */
    readonly userCustomKeybindingsFile: Uri | undefined;
    /**
     * The detected default shell for the extension host, this is overridden by the
     * `terminal.integrated.shell` setting for the extension host's platform.
     *
     * @type {string}
     * @memberof IApplicationShell
     */
    readonly shell: string;
    /**
     * Gets the vscode channel (whether 'insiders' or 'stable').
     */
    readonly channel: Channel;
    /**
     * The version of the editor.
     */
    readonly vscodeVersion: string;
    /**
     * The custom uri scheme the editor registers to in the operating system.
     */
    readonly uriScheme: string;
    readonly uiKind: UIKind;
}

export interface IWebviewMessageListener {
    /**
     * Listens to webview messages
     * @param message: the message being sent
     * @param payload: extra data that came with the message
     */
    onMessage(message: string, payload: any): void;
}

export const IWebviewPanelMessageListener = Symbol('IWebviewPanelMessageListener');
export interface IWebviewPanelMessageListener extends IWebviewMessageListener, IAsyncDisposable {
    /**
     * Listens to web panel state changes
     */
    onChangeViewState(panel: IWebviewPanel): void;
}

export const IWebviewViewMessageListener = Symbol('IWebviewViewMessageListener');
export interface IWebviewViewMessageListener extends IWebviewMessageListener, IAsyncDisposable {}

export type WebviewMessage = {
    /**
     * Message type
     */
    type: string;

    /**
     * Payload
     */
    payload?: any;
};

// Wraps a VS Code webview
export const IWebview = Symbol('IWebview');
export interface IWebview {
    /**
     * Event is fired when the load for a web panel fails
     */
    readonly loadFailed: Event<void>;
    /**
     * Sends a message to the hosted html page
     */
    postMessage(message: WebviewMessage): void;
    /**
     * Convert a uri for the local file system to one that can be used inside webviews.
     *
     * Webviews cannot directly load resources from the workspace or local file system using `file:` uris. The
     * `asWebviewUri` function takes a local `file:` uri and converts it into a uri that can be used inside of
     * a webview to load the same resource:
     *
     * ```ts
     * webview.html = `<img src="${webview.asWebviewUri(vscode.Uri.file('/Users/codey/workspace/cat.gif'))}">`
     * ```
     */
    asWebviewUri(localResource: Uri): Uri;
}

// Wraps the VS Code webview view
export const IWebviewView = Symbol('IWebviewView');
export interface IWebviewView extends IWebview {
    readonly onDidChangeVisibility: Event<void>;
    readonly visible: boolean;
}

export interface IWebviewOptions {
    rootPath: Uri;
    cwd: Uri;
    scripts: Uri[];
    /**
     * Additional paths apart from cwd and rootPath, that webview would allow loading resources/files from.
     * E.g. required for webview to serve images from worksapces when nb is in a nested folder.
     */
    additionalPaths?: Uri[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    settings?: any;
    // Instead of creating a webview we may be passed on already created by VS Code
    webviewHost?: vscodeWebviewView | vscodeWebviewPanel;
}

export interface IWebviewViewOptions extends IWebviewOptions {
    listener: IWebviewViewMessageListener;
}

// Wraps the VS Code webview panel
export const IWebviewPanel = Symbol('IWebviewPanel');
export interface IWebviewPanel extends IWebview {
    /**
     * Editor position of the panel. This property is only set if the webview is in
     * one of the editor view columns.
     */
    viewColumn: ViewColumn | undefined;
    setTitle(val: string): void;
    /**
     * Makes the webpanel show up.
     * @return A Promise that can be waited on
     */
    show(preserveFocus: boolean): Promise<void>;

    /**
     * Indicates if this web panel is visible or not.
     */
    isVisible(): boolean;

    /**
     * Attempts to close the panel if it's visible
     */
    close(): void;
    /**
     * Indicates if the webview has the focus or not.
     */
    isActive(): boolean;
}

export interface IWebviewPanelOptions extends IWebviewOptions {
    viewColumn: ViewColumn;
    listener: IWebviewPanelMessageListener;
    title: string;
}

// Wraps the VS Code api for creating a web panel
export const IWebviewPanelProvider = Symbol('IWebviewPanelProvider');
export interface IWebviewPanelProvider {
    create(options: IWebviewPanelOptions): Promise<IWebviewPanel>;
}

export interface IWebviewViewOptions extends IWebviewOptions {
    listener: IWebviewViewMessageListener;
}

export const IWebviewViewProvider = Symbol('IWebviewViewProvider');
export interface IWebviewViewProvider {
    create(options: IWebviewViewOptions): Promise<IWebviewView>;
}
export const ILanguageService = Symbol('ILanguageService');
export interface ILanguageService {
    /**
     * Register a completion provider.
     *
     * Multiple providers can be registered for a language. In that case providers are sorted
     * by their [score](#languages.match) and groups of equal score are sequentially asked for
     * completion items. The process stops when one or many providers of a group return a
     * result. A failing provider (rejected promise or exception) will not fail the whole
     * operation.
     *
     * @param selector A selector that defines the documents this provider is applicable to.
     * @param provider A completion provider.
     * @param triggerCharacters Trigger completion when the user types one of the characters, like `.` or `:`.
     * @return A [disposable](#Disposable) that unregisters this provider when being disposed.
     */
    registerCompletionItemProvider(
        selector: DocumentSelector,
        provider: CompletionItemProvider,
        ...triggerCharacters: string[]
    ): Disposable;
}

export type Channel = 'stable' | 'insiders';

export const IClipboard = Symbol('IClipboard');
export interface IClipboard {
    /**
     * Read the current clipboard contents as text.
     */
    readText(): Promise<string>;

    /**
     * Writes text into the clipboard.
     */
    writeText(value: string): Promise<void>;
}

export const IVSCodeNotebook = Symbol('IVSCodeNotebook');
export interface IVSCodeNotebook {
    readonly onDidChangeNotebookCellExecutionState: Event<NotebookCellExecutionStateChangeEvent>;
    readonly notebookDocuments: ReadonlyArray<NotebookDocument>;
    readonly onDidOpenNotebookDocument: Event<NotebookDocument>;
    readonly onDidCloseNotebookDocument: Event<NotebookDocument>;
    readonly onDidChangeVisibleNotebookEditors: Event<readonly NotebookEditor[]>;
    readonly onDidSaveNotebookDocument: Event<NotebookDocument>;
    readonly onDidChangeNotebookEditorSelection: Event<NotebookEditorSelectionChangeEvent>;
    readonly onDidChangeActiveNotebookEditor: Event<NotebookEditor | undefined>;
    readonly notebookEditors: Readonly<NotebookEditor[]>;
    readonly activeNotebookEditor: NotebookEditor | undefined;
    registerNotebookSerializer(
        notebookType: string,
        serializer: NotebookSerializer,
        options?: NotebookDocumentContentOptions
    ): Disposable;

    createNotebookController(
        id: string,
        viewType: string,
        label: string,
        handler?: (
            cells: NotebookCell[],
            notebook: NotebookDocument,
            controller: NotebookController
        ) => void | Thenable<void>,
        rendererScripts?: NotebookRendererScript[],
        additionalLocalResourceRoots?: Uri[]
    ): NotebookController;
    openNotebookDocument(uri: Uri): Thenable<NotebookDocument>;
    openNotebookDocument(viewType: string, content?: NotebookData): Promise<NotebookDocument>;
    showNotebookDocument(document: NotebookDocument, options?: NotebookDocumentShowOptions): Thenable<NotebookEditor>;
}

export const IEncryptedStorage = Symbol('IEncryptedStorage');
export interface IEncryptedStorage {
    store(service: string, key: string, value: string | undefined): Promise<void>;
    retrieve(service: string, key: string): Promise<string | undefined>;
}
