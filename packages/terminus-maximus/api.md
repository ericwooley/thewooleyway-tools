## Functions

<dl>
<dt><a href="#renderScreens">renderScreens(config, scriptToExecute)</a></dt>
<dd><p>Renders the screens and executes the script group</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#TerminusMaximusConfig">TerminusMaximusConfig</a></dt>
<dd></dd>
<dt><a href="#ScriptConfig">ScriptConfig</a></dt>
<dd></dd>
<dt><a href="#CommandConfig">CommandConfig</a> : <code>Object</code></dt>
<dd><p>Config for a command.</p>
</dd>
</dl>

<a name="renderScreens"></a>

## renderScreens(config, scriptToExecute)
Renders the screens and executes the script group

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| config | [<code>TerminusMaximusConfig</code>](#TerminusMaximusConfig) | - terminus maximus config object |
| scriptToExecute | <code>String</code> | which script to execute from the config |

<a name="TerminusMaximusConfig"></a>

## TerminusMaximusConfig
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| errorHeight | <code>Number</code> | The height for the error console |
| scripts | <code>Object.&lt;string, CommandConfig&gt;</code> | Config for each command group to run |
| screensPerRow | <code>Number</code> | The number of screens per row |

<a name="ScriptConfig"></a>

## ScriptConfig
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| screensPerRow | <code>Number</code> | Number of strings per row |
| commands | <code>Array.CommandConfig</code> | Commands to run |

<a name="CommandConfig"></a>

## CommandConfig : <code>Object</code>
Config for a command.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | The label to show in above your command |
| command | <code>String</code> | Command to run |
| screenConfig | <code>Object</code> | Blessed.Screen Config |

