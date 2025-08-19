{{/*
Application name.
*/}}
{{- define "ducks-tinder-client.app.name" -}}
frontend-app
{{- end }}

{{/*
Expand the name of the chart.
*/}}
{{- define "ducks-tinder-client.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "ducks-tinder-client.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}
