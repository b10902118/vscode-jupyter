// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Uri, workspace } from 'vscode';
import { IDisposableRegistry, IExtensions, IsWebExtension, Resource } from '../common/types';
import { PythonEnvironment } from '../pythonEnvironments/info';
import { inject, injectable } from 'inversify';
import { IInterpreterService } from './contracts';
import { IPythonExtensionChecker } from '../api/types';
import { areInterpreterPathsSame } from '../pythonEnvironments/info/interpreter';
import { IWorkspaceInterpreterTracker } from './types';
import { getWorkspaceFolderIdentifier } from '../common/application/workspace.base';

/**
 * Tracks the interpreters in use for a workspace. Necessary to send kernel telemetry.
 */
@injectable()
export class DesktopWorkspaceInterpreterTracker implements IWorkspaceInterpreterTracker {
    private readonly workspaceInterpreters = new Map<string, undefined | Uri>();
    private trackingInterpreters?: boolean;
    constructor(
        @inject(IExtensions) private readonly extensions: IExtensions,
        @inject(IPythonExtensionChecker) private readonly pythonExtensionChecker: IPythonExtensionChecker,
        @inject(IDisposableRegistry) private readonly disposables: IDisposableRegistry,
        @inject(IInterpreterService) private readonly interpreterService: IInterpreterService,
        @inject(IsWebExtension) private readonly webExtension: boolean
    ) {}
    public activate() {
        this.trackActiveInterpreters();
        this.extensions.onDidChange(this.trackActiveInterpreters, this, this.disposables);
    }
    public isActiveWorkspaceInterpreter(resource: Resource, interpreter?: PythonEnvironment) {
        if (!interpreter) {
            return false;
        }
        const key = getWorkspaceFolderIdentifier(resource);
        const activeInterpreterPath = this.workspaceInterpreters.get(key);
        if (!activeInterpreterPath) {
            return false;
        }
        return areInterpreterPathsSame(activeInterpreterPath, interpreter.uri);
    }
    private trackActiveInterpreters() {
        if (this.webExtension) {
            return;
        }
        if (this.trackingInterpreters || !this.pythonExtensionChecker.isPythonExtensionActive) {
            return;
        }
        this.trackingInterpreters = true;
        this.interpreterService.onDidChangeInterpreter(
            async () => {
                const workspaces: Uri[] = Array.isArray(workspace.workspaceFolders)
                    ? workspace.workspaceFolders.map((item) => item.uri)
                    : [];
                await Promise.all(
                    workspaces.map(async (item) => {
                        try {
                            const workspaceId = getWorkspaceFolderIdentifier(item);
                            const interpreter = await this.interpreterService.getActiveInterpreter(item);
                            this.workspaceInterpreters.set(workspaceId, interpreter?.uri);
                        } catch (ex) {
                            // Don't care.
                        }
                    })
                );
            },
            this,
            this.disposables
        );
    }
}
