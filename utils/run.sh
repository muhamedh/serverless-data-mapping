echo "hello"
run_id=run-rhYQSmy8EmSfnVZk
echo $run_id
url="https://app.terraform.io/api/v2/runs/{$run_id}"
echo $url
curl --header "Authorization: Bearer Ol3drzxMfmApLw.atlasv1.9FEomP0PXvbT6gEQFH2akJFWwSkTLRmICzX9YgLyvUYrwzeH64S42w23dwf0BrjEjyM" --header "Content-Type:application/vnd.api+json" $url -o test_get_response.json
