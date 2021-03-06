import { inject, provide } from 'midway-mirror';
import { DebuggableHost, HostSelector, AppSelector, UserSelector } from '../../interface/services/common';
import {PandoraAdapter} from '../adapter/pandoraAdapter';
import {Cipher} from '../debugServer/cipher';
import {IRemoteDebugService} from '../../interface/services/IRemoteDebugService';

@provide('remoteDebugService')
export class RemoteDebugService implements IRemoteDebugService {

  @inject('pandoraAdapter')
  protected pandoraAdapter: PandoraAdapter;

  async getDebuggableHost(options: HostSelector & AppSelector & UserSelector): Promise<DebuggableHost> {
    const {uid} = options;
    const debuggableProcesses = await this.pandoraAdapter.getDebuggableProcesses(options);
    for (const process of debuggableProcesses) {
      process.token = Cipher.encrypt(JSON.stringify({
        debugPort: process.debugPort,
        ip: options.ip,
        webSocketDebuggerUrl: process.webSocketDebuggerUrl,
        u: uid },
      ));
    }
    return debuggableProcesses;
  }

}
