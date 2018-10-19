
## Install
* configure hooks: `git config core.hooksPath hooks`
* replace the basic terminal by git bash : `File --> Settings --> Terminal --> Shell path : "C:\Program Files\Git\bin\sh.exe" -login -i`


## code 

* generate a *module* for each objects  `ng g m KalSelect` 
* generate a *component* with class prefix directly  `ng g c KalSelect` 
* generate a *README.md* by object defining component and his specs 
* each module must export all dependencies

## style

* each object contains a mixin named from component `+kal-select($params)`
